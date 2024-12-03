import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { styled } from 'nativewind';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Button from '../../../components/Button';
import NavProgressBar from '../components/NavProgressBar';
import { useAuth } from '../../../context/AuthContext';
import TextInputComponent from '../components/TextInputComponent';
import Constants from 'expo-constants';

const GOOGLE_API_KEY = Constants.expoConfig.extra.googleApiKey;
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

export default function LegalInformationScreen({ navigation }) {
  const { signupData, updateSignupData } = useAuth(); // Access signupData and updateSignupData from AuthContext
  const [isManualEntry, setIsManualEntry] = useState(false); // Track manual entry mode

  // Parse Google Places API response into normalized address format
  const handleAddressSelect = (data, details) => {
    const components = details?.address_components || [];
    const findComponent = (type) => components.find((c) => c.types.includes(type))?.long_name || '';

    const streetNumber = findComponent('street_number');
    const route = findComponent('route');
    const addressLine = `${streetNumber} ${route}`.trim(); // Combine street number and route

    const parsedAddress = {
      addressLine,
      city: findComponent('locality'),
      zipCode: findComponent('postal_code'),
      country: findComponent('country'),
    };

    Object.entries(parsedAddress).forEach(([key, value]) => {
      updateSignupData(`address.${key}`, value);
    });
  };

  const handleNext = () => {
    navigation.navigate('QuestionsScreen'); // Replace with your actual next screen
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-surfaceBG">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <StyledView className="flex-1 items-center bg-surfaceBG p-6 justify-between">
          {/* Progress Bar */}
          <NavProgressBar
            currentStep={4}
            totalSteps={6}
            buttonType="back"
            onPress={() => navigation.goBack()}
          />

          {/* Legal Information Input Section */}
          <StyledView className="w-full flex-1 justify-center items-center">
            <StyledText className="text-center text-2xl font-bold text-black mb-2">
              Some legal information
            </StyledText>
            <StyledText className="text-center text-gray-600 mb-8">
              We need this information to get you started investing in 3 Stones.
            </StyledText>

            {/* Social Security Number Input */}
            <TextInputComponent
              placeholder="Social Security Number"
              value={signupData.ssn}
              onChangeText={(input) => updateSignupData('ssn', input.replace(/\D/g, '').slice(0, 9))}
              keyboardType="numeric"
              maxLength={9}
            />

            {/* Address Input */}
            {!isManualEntry ? (
              <GooglePlacesAutocomplete
                placeholder="Start typing your address..."
                fetchDetails={true}
                onPress={handleAddressSelect}
                query={{
                  key: GOOGLE_API_KEY,
                  language: 'en',
                }}
                styles={{
                  textInputContainer: {
                    width: '100%',
                    marginBottom: 10,
                  },
                  textInput: {
                    height: 48,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    backgroundColor: 'white',
                    fontSize: 16,
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
              />
            ) : (
              <>
                <TextInputComponent
                  placeholder="Address Line"
                  value={signupData.address.addressLine}
                  onChangeText={(input) =>
                    updateSignupData('address.addressLine', input)
                  }
                  keyboardType="default"
                />
                <TextInputComponent
                  placeholder="City"
                  value={signupData.address.city}
                  onChangeText={(input) => updateSignupData('address.city', input)}
                  keyboardType="default"
                />
                <TextInputComponent
                  placeholder="Zip Code"
                  value={signupData.address.zipCode}
                  onChangeText={(input) =>
                    updateSignupData('address.zipCode', input)
                  }
                  keyboardType="numeric"
                />
                <TextInputComponent
                  placeholder="Country"
                  value={signupData.address.country}
                  onChangeText={(input) =>
                    updateSignupData('address.country', input)
                  }
                />
              </>
            )}

            {/* Toggle Manual Entry */}
            <StyledTouchableOpacity onPress={() => setIsManualEntry((prev) => !prev)}>
              <StyledText className="text-primary underline">
                {isManualEntry
                  ? 'Use Address Autocomplete'
                  : 'Enter Address Manually'}
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          {/* Continue Button */}
          <StyledView className="w-full mt-6">
            <Button
              type="primary"
              onPress={handleNext}
              disabled={!signupData.ssn.trim() || !signupData.address.addressLine.trim()}>
              Continue
            </Button>
          </StyledView>
        </StyledView>
      </TouchableWithoutFeedback>
    </StyledSafeAreaView>
  );
}
