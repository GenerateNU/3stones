import React, { useRef, useState } from 'react';
import { Image, Text, View, TouchableOpacity, DimensionValue, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import Button from '../../components/Button';
import { useProject, useProjectTotalFunded } from '../../services/project';
import MapView from 'react-native-maps';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TextField from '../../components/TextField';
import TextInputComponent from '../login/components/TextInputComponent';
import Card from '../../components/Card';
import Tag from '../../components/Tag';

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledBottomSheetView = styled(BottomSheetView);
const StyledBottomSheet = styled(BottomSheet);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledTouchableWithoutFeedback = styled(TouchableWithoutFeedback);

interface ProjectInvestSuccessScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

export default function ProjectInvestSuccessScreen({ navigation }: ProjectInvestSuccessScreenProps) {
  const [amount, setAmount] = useState("")

  const transactionDetails = [
    ["Transaction ID", "4444 3333 2222 1111"],
    ["Date", "September 1, 2024"],
    ["Nominal", "$100.00"],
    ["Administrative Fee", "$0.25"]
  ]
  return (
    <StyledTouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledKeyboardAvoidingView className='flex flex-col flex-1 p-6 bg-surfaceBG' behavior="height">

        <StyledView className="flex flex-col">
          <StyledText className="text-[#282828]font-body text-base font-normal leading-[22px]">Total Cash Available</StyledText>
          <StyledView className="flex flex-row items-center justify-between mt-1">
            <StyledText className="truncate text-[#282828] font-heading text-[32px] font-extrabold leading-[40px]">$1,234,567</StyledText>
            <Button type="secondary" size="small">
              Add funds
            </Button>
          </StyledView>
        </StyledView>

        <Card className='flex-1 my-8 px-7 py-8'>
          <StyledText className="text-2xl font-heading">Payment successful!</StyledText>
          <StyledText className='text-base'>You successfully invested $100 into this project.</StyledText>

          <StyledView className='flex flex-col gap-y-2 py-4'>
            {transactionDetails.map((val, idx, arr) => (
              <StyledView className='flex flex-row justify-between'>
                <StyledText className='font-heading text-base'>{val[0]}</StyledText>
                <StyledText className='font-body text-base'>{val[1]}</StyledText>
              </StyledView>
            ))}
            <StyledView className='flex flex-row justify-between'>
              <StyledText className='font-heading text-base'>Status</StyledText>
              <Tag level="success">Success</Tag>
            </StyledView>
          </StyledView>
        </Card>

      </StyledKeyboardAvoidingView>
    </StyledTouchableWithoutFeedback>


  )
}