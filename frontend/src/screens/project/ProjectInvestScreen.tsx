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
import { useAuth } from '../../context/AuthContext';
import { useInvestorBalance, useInvestors } from '../../services/investor';
import { invest } from '../../services/plaid';

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledBottomSheetView = styled(BottomSheetView);
const StyledBottomSheet = styled(BottomSheet);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledTouchableWithoutFeedback = styled(TouchableWithoutFeedback);

interface ProjectInvestScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}

export default function ProjectInvestScreen({ navigation, route }) {
  const projectId = route.params.projectId;

  const { session, isLoading } = useAuth();
  const { balance, isLoading: isInvestorLoading} = useInvestorBalance();
    
  const [amount, setAmount] = useState("")

  if (isLoading || isInvestorLoading) {
    return null;
  }

  return (
    <StyledTouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledKeyboardAvoidingView className='flex flex-col flex-1 p-6 bg-surfaceBG' behavior="height">

        <StyledView className="flex flex-col">
          <StyledText className="text-[#282828]font-body text-base font-normal leading-[22px]">Total Cash Available</StyledText>
          <StyledView className="flex flex-row items-center justify-between mt-1">
            <StyledText className="truncate text-[#282828] font-heading text-[32px] font-extrabold leading-[40px]">{`\$${(balance/100).toFixed(2)}`}</StyledText>
            <Button type="secondary" size="small">
              Add funds
            </Button>
          </StyledView>

          {balance != 0 ? <>
            <StyledText className="mt-8 font-title text-lg mb-4">Investment Amount</StyledText>
            <TextInputComponent keyboardType='decimal-pad' placeholder="Enter amount" value={amount} onChangeText={(val) => setAmount(val)} />

            <StyledView className="flex flex-row w-full justify-between">
              {[50, 100, 500, 1000].map((val, ind, arr) => {
                return (
                  <Button size="small" type="secondary" onPress={() => setAmount(val.toString())}>{`\$${val}`}</Button>
                )
              })}
            </StyledView>

            <Button
              className="w-full mt-8"
              type="primary"
              disabled={amount == ""}
              onPress={async () => { 
                const data = await invest(session.access_token, 'c3733692-5a86-441f-8ad0-9c32c648bb72', (parseFloat(amount) * 100))
                console.log(data)
                navigation.navigate("project-invest-success", { transactionInfo: data })
              }}>
              Make Payment
            </Button>
          </> : <StyledText className="text-[#282828]font-body text-base font-normal leading-[22px] mt-8">Please add funds to your wallet in order to invest in this project.</StyledText>  }
        </StyledView>


      </StyledKeyboardAvoidingView>
    </StyledTouchableWithoutFeedback>


  )
}
