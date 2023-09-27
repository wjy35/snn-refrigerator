import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import {Text, View} from "react-native";

export default function KoreanWordWrap(props: {
    textStyle?: any;
    str: string; }) {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
        }}>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent:'center',
            }}>
                {
                    props.str.split(' ').map((word: string, index) => <Text key={index} style={props.textStyle}>{word} </Text>)
                }
            </View>
        </View>
    )
}
