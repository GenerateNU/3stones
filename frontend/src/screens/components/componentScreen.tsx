import { styled } from 'nativewind';
import React from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/Button';

const StyledView = styled(View)

export default function ComponentScreen() {
  return (
    <StyledView className="p-2 my-12">
        <Button type="primary" size="small"><Text>Action</Text></Button>
        <Button type="primary" size="medium"><Text>Action</Text></Button>
        <Button type="primary" size="large"><Text>Action</Text></Button>
        <Button type="secondary" size="small"><Text>Action</Text></Button>
        <Button type="secondary" size="medium"><Text>Action</Text></Button>
        <Button type="secondary" size="large"><Text>Action</Text></Button>
        <Button type="plainDark" size="small"><Text>Action</Text></Button>
        <Button type="plainDark" size="medium"><Text>Action</Text></Button>
        <Button type="plainDark" size="large"><Text>Action</Text></Button>
    </StyledView>
  );
}
