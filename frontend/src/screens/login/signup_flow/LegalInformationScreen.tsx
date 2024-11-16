import React, { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Button from '../../../components/Button';
import ProgressBar from '../../../components/ProgressBar';
import { SignupContext } from '../../../context/SignupContext';
import Config from 'react-native-config';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function LegalInformationScreen({ navigation }) {
  const { formData, updateForm } = useContext(SignupContext);
  const [socialSecurityNumber, setSocialSecurityNumber] = useState(formData.socialSecurityNumber || '');

  // Unified address state
  const [address, setAddress] = useState({
    addressLine: '',
    city: '',
    zipCode: '',
    country: '',
  });

  const [isManualEntry, setIsManualEntry] = useState(false); // Track manual entry mode

  // Update address dynamically (manual entry or Google)
  const updateAddress = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Parse Google Places API response into normalized address format
  const handleAddressSelect = (data, details) => {
    const components = details?.address_components || [];
    const findComponent = (type) => components.find((c) => c.types.includes(type))?.long_name || '';

    const parsedAddress = {
      addressLine: findComponent('route') || findComponent('street_address'),
      city: findComponent('locality'),
      zipCode: findComponent('postal_code'),
      country: findComponent('country'),
    };

    setAddress(parsedAddress); // Update the unified address state
  };

  const handleNext = () => {
    updateForm('socialSecurityNumber', socialSecurityNumber);
    updateForm('address', address);
    navigation.navigate('InvestmentPlanScreen'); // Replace with your actual next screen
  };

  return (
    <StyledKeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <StyledScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled" // Ensures taps are passed through to nested components
      >
        <StyledView className="flex-1 items-center bg-surfaceBG p-6 justify-between">

          {/* Progress Bar */}
          <StyledView className="w-full mb-4">
            <ProgressBar current={4} total={6} />
          </StyledView>

          {/* Legal Information Input Section */}
          <StyledView className="w-full flex-1 justify-center items-center">
            <StyledText className="text-center text-2xl font-bold text-black mb-2">Some legal information</StyledText>
            <StyledText className="text-center text-gray-600 mb-8">
              We need this information to get you started investing in 3 Stones.
            </StyledText>

            {/* Social Security Number Input */}
            <StyledTextInput
              className="w-11/12 h-12 px-4 border border-gray-300 rounded-md mb-4"
              placeholder="Social Security Number"
              value={socialSecurityNumber}
              onChangeText={setSocialSecurityNumber}
              keyboardType="numeric"
              maxLength={11} // Format: XXX-XX-XXXX
            />

            {/* Address Input */}
            {!isManualEntry ? (
              <GooglePlacesAutocomplete
                placeholder="Start typing your address..."
                fetchDetails={true}
                onPress={handleAddressSelect}
                query={{
                  key: Config.GOOGLE_API_KEY, // Replace with your Google API Key
                  language: 'en',
                }}
                styles={{
                  textInputContainer: {
                    width: '92%',
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
                <StyledTextInput
                  className="w-11/12 h-12 px-4 border border-gray-300 rounded-md mb-4"
                  placeholder="Address Line"
                  value={address.addressLine}
                  onChangeText={(text) => updateAddress('addressLine', text)}
                />
                <StyledTextInput
                  className="w-11/12 h-12 px-4 border border-gray-300 rounded-md mb-4"
                  placeholder="City"
                  value={address.city}
                  onChangeText={(text) => updateAddress('city', text)}
                />
                <StyledTextInput
                  className="w-11/12 h-12 px-4 border border-gray-300 rounded-md mb-4"
                  placeholder="Zip Code"
                  value={address.zipCode}
                  onChangeText={(text) => updateAddress('zipCode', text)}
                  keyboardType="numeric"
                />
                <StyledTextInput
                  className="w-11/12 h-12 px-4 border border-gray-300 rounded-md mb-4"
                  placeholder="Country"
                  value={address.country}
                  onChangeText={(text) => updateAddress('country', text)}
                />
              </>
            )}

            {/* Toggle Manual Entry */}
            <StyledTouchableOpacity onPress={() => setIsManualEntry((prev) => !prev)}>
              <StyledText className="text-primary underline">
                {isManualEntry ? 'Use Address Autocomplete' : 'Enter Address Manually'}
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          {/* Continue Button */}
          <StyledView className="w-full mt-6">
            <Button
              type="primary"
              onPress={handleNext}
              disabled={!socialSecurityNumber.trim() || !address.addressLine.trim()}
            >
              Continue
            </Button>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}
