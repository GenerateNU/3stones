import { styled } from 'nativewind';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Tag from '../../components/Tag';

const StyledView = styled(View)

export default function ComponentScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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

        <Card>
            <Text>Small Default Card</Text>
        </Card>

        <Tag level="neutral">Neutral Tag</Tag>
        <Tag level="success">Success Tag</Tag>
        <Tag level="warning">Warning Tag</Tag>
        <Tag level="critical">Critical Tag</Tag>
        <Tag level="neutralSubdued">Neutral Subdued Tag</Tag>
        <Tag level="successSubdued">Success Subdued Tag</Tag>
        <Tag level="warningSubdued">Warning Subdued Tag</Tag>
        <Tag level="criticalSubdued">Critical Subdued Tag</Tag>
      </StyledView>
    </ScrollView>
  );
}
