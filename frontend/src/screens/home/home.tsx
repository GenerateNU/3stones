import React from 'react';
import { Image, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
// import { NavigationScreenProp } from 'react-navigation';
import { styled } from 'nativewind';
import { useInvestors } from '../../services/investor';


interface HomeScreenProps {
  // This actually should be `any`, so disabling the linter rule
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationScreenProp<any, any>;
}
// interface HomeScreenProps {
//   // This actually should be `any`, so disabling the linter rule
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   navigation: NavigationScreenProp<any, any>;
// }

const StyledView = styled(View);
const StyledText = styled(Text);

export default function HomeScreen({ navigation }: HomeScreenProps) {
  console.log("Hello, world");

  async function getEndPoint() {
    try {
      console.log(await useInvestors());
    }
    catch (error) {
      console.log(error);
    } 
  }
  
  getEndPoint();
  
  return (<></>);
  //   <StyledView className='flex-1 items-center justify-center bg-surfaceBG'>
  //     {/* Some dummy image */}
  //     <StyledView className='align-center'>
  //       <Image source={require('../../../assets/images/icon.png')}/>
  //     </StyledView>
  //     {/* Some dummy button */}
  //     <ButtonComponent
  //             title="Continue"
  //             theme="primary"
  //             // do nothing for now
  //             onPress = {() => {}}
  //             disabled={false}
  //           />
  //           <ButtonComponent
  //             title="Continue"
  //             theme="secondary"
  //             // do nothing for now
  //             onPress = {() => {}}
  //             disabled={false}
  //           />
  //           <ButtonComponent
  //             title="Continue"
  //             theme="secondary"
  //             // do nothing for now
  //             onPress = {() => {}}
  //             disabled={true}
  //           />
  //           <TextInputComponent
  //             placeholder="Username"
  //             value=""
  //             onChangeText={() => {}}
  //             isPassword={false}
  //           />
  //           <ProgressBarComponent
  //             currentStep={1}
  //             totalSteps={3}
  //             showBack={true}
  //             showClose={false}
  //             onPress = {() => {}}
  //           />

        
  //   <StyledView className='flex-1 items-center bg-surfaceBG'>
  //     <StyledView className='pt-[5vh]'>
  //       <WelcomeBlock name='Michael' />
  //       <PortfolioValue
  //         Portfoliovalue={12345.67}
  //         portfolioChange={350.23}
  //         navigation={navigation}
  //       />
  //     </StyledView>
  //     {/* Some dummy image */}
  //     <StyledView className='align-center'>
  //       <Image source={require('../../../assets/images/icon.png')}/>
  //       {/* Some dummy button */}
       
  //     </StyledView>
  //     <View>
  //       <TouchableOpacity onPress={() => navigation.navigate('secondScreen')}>
  //         <View>
  //           <StyledText className='align-center text-3xl font-title text-defaultText'>
  //             Dummy page
  //           </StyledText>
  //         </View>
  //       </TouchableOpacity>
  //       <TouchableOpacity onPress={() => navigation.navigate('profileScreen')}>
  //         <View>
  //           <StyledText className='align-center text-3xl font-title text-defaultText'>
  //             Profile Page
  //           </StyledText>
  //         </View>
  //       </TouchableOpacity>
  //            </View>
  //   <StyledView className='w-[100vw] h-[100vh] flex items-center justify-center'>
  //     <Button
  //       title='Log Out'
  //       onPress={() => {
  //         signOut();
  //       }}
  //     />
  //     <StyledText>{developers}</StyledText>
  //           <Button onPress={(evt) => {
  //             console.log("Hello, world!");
  //           }} title="Click me"></Button>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   </StyledView>
  //   **/
  // );
}
