import React, { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { styled } from 'nativewind';
import Button from '../../../components/Button';
import ProgressBar from '../../../components/ProgressBar';
import { SignupContext } from '../../../context/SignupContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);
const StyledTextInput = styled(TextInput);

export default function ManualAddressScreen({ navigation }) {
  const { formData, updateForm } = useContext(SignupContext);
  const [addressLine, setAddressLine] = useState(formData.addressLine || '');
  const [city, setCity] = useState(formData.city || '');
  const [zipCode, setZipCode] = useState(formData.zipCode || '');
  const [country, setCountry] = useState(formData.country || '');

  const handleNext = () => {
    updateForm('addressLine', addressLine);
    updateForm('city', city);
    updateForm('zipCode', zipCode);
    updateForm('country', country);
    navigation.goBack();
  };

  return (
    <StyledKeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <StyledScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 items-center bg-surfaceBG p-6 justify-between">

          {/* Progress Bar */}
          <StyledView className="w-full mb-4">
            <ProgressBar
              current={4}
              total={6} // Adjust according to your flow
            />
          </StyledView>

          {/* Manual Address Input Section */}
          <StyledView className="w-full flex-1 justify-center items-center">
            <StyledText className="text-center text-2xl font-bold text-black mb-2">Some legal information</StyledText>
            <StyledText className="text-center text-gray-600 mb-8">
              We need this information to get you started investing in 3 Stones.
            </StyledText>

            <StyledTextInput
              className="w-11/12 h-12 px-4 border border-gray-300 rounded-md mb-4"
              placeholder="Address Line"
              value={addressLine}
              onChangeText={setAddressLine}
            />

            <StyledTextInput
              className="w-11/12 h-12 px-4 border border-gray-300 rounded-md mb-4"
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />

            <StyledTextInput
              className="w-11/12 h-12 px-4 border border-gray-300 rounded-md mb-4"
              placeholder="Zip Code"
              value={zipCode}
              onChangeText={setZipCode}
              keyboardType="numeric"
            />

            <StyledTextInput
              className="w-11/12 h-12 px-4 border border-gray-300 rounded-md mb-4"
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />
          </StyledView>

          {/* Continue Button */}
          <StyledView className="w-full mt-6">
            <Button
              type="primary"
              onPress={handleNext}
              disabled={!addressLine.trim() || !city.trim() || !zipCode.trim() || !country.trim()}
            >
              Save Address
            </Button>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  );
}
