import { styled } from 'nativewind';
import React from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Tag from '../../components/Tag';

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

        <Card>
            <Text>Small Default Card</Text>
        </Card>

        <Tag level="neutral" type="default">Neutral Default</Tag>
        <Tag level="neutral" type="defaultWithIcon" icon={<Text>•</Text>}>Neutral Default + Icon</Tag>
        <Tag level="neutral" type="subdued">Neutral Subdued</Tag>
        <Tag level="neutral" type="subduedWithIcon" icon={<Text>•</Text>}>Neutral Subdued + Icon</Tag>

        <Tag level="success" type="default">Success Default</Tag>
        <Tag level="success" type="defaultWithIcon" icon={<Text>•</Text>}>Success Default + Icon</Tag>
        <Tag level="success" type="subdued">Success Subdued</Tag>
        <Tag level="success" type="subduedWithIcon" icon={<Text>•</Text>}>Success Subdued + Icon</Tag>

        <Tag level="warning" type="default">Warning Default</Tag>
        <Tag level="warning" type="defaultWithIcon" icon={<Text>•</Text>}>Warning Default + Icon</Tag>
        <Tag level="warning" type="subdued">Warning Subdued</Tag>
        <Tag level="warning" type="subduedWithIcon" icon={<Text>•</Text>}>Warning Subdued + Icon</Tag>

        <Tag level="critical" type="default">Critical Default</Tag>
        <Tag level="critical" type="defaultWithIcon" icon={<Text>•</Text>}>Critical Default + Icon</Tag>
        <Tag level="critical" type="subdued">Critical Subdued</Tag>
        <Tag level="critical" type="subduedWithIcon" icon={<Text>•</Text>}>Critical Subdued + Icon</Tag>
    </StyledView>
  );
}
