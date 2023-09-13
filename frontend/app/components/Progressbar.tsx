import {Text, View} from 'react-native';
import {progressbarStyles} from "@/styles/progressbarStyles";
import {SvgXml} from'react-native-svg';
import {progressCheck} from '@/assets/icons/icons';
import React from "react";
import LinearGradient from 'react-native-linear-gradient';
import {styles} from "@/styles/styles";


interface props {
  progress: number;
  total: number;
  textList: string[];
}
const Progressbar = ({progress, total, textList}: props) => {
  const totalList = Array.from({length: total}, (v, i) => i+1)


  const now = (i: number) => {
    return (
      <>
        <View style={progressbarStyles.nowContainer}>
          <View style={progressbarStyles.textItemContainer}>
            <Text style={[styles.font, progressbarStyles.nowText]}>{textList[i]}</Text>
          </View>
          <View style={progressbarStyles.nowOuter}>
            <View style={progressbarStyles.nowInner}></View>
          </View>
        </View>
      </>
    )
  }

  const wait = (i: number) => {
    return (
      <>
        <View style={progressbarStyles.waitContainer}>
          <View style={progressbarStyles.textItemContainer}>
            <Text style={[styles.font, progressbarStyles.waitText]}>{textList[i]}</Text>
          </View>
          <View style={progressbarStyles.waitOuter}>
            <View style={progressbarStyles.waitInner}></View>
          </View>
        </View>
      </>
    )
  }

  const done = (i: number) => {
    return (
      <>
        <View style={progressbarStyles.doneContainer}>
          <View style={progressbarStyles.textItemContainer}>
            <Text style={[styles.font, progressbarStyles.doneText]}>{textList[i]}</Text>
          </View>
          <View style={progressbarStyles.doneOuter}>
            <SvgXml
              xml={progressCheck}
              width={20}
              height={20}
            />
          </View>
        </View>
      </>
    )
  }

  const now2wait = () => {
    return (
      <>
        <View style={progressbarStyles.now2wait}></View>
      </>
    )
  }

  const done2now = () => {
    return (
      <>
        <LinearGradient
          start={{x: 0.5, y: 0}} end={{x: 1, y: 0}}
          colors={['#3093EF', '#1364FF']}
          style={progressbarStyles.done2now}></LinearGradient>
      </>
    )
  }

  const done2done = () => {
    return (
      <>
        <View style={progressbarStyles.done2done}></View>
      </>
    )
  }

  return (
    <>
      <View>
        <View style={progressbarStyles.progressContainer}>
          {totalList.map((i: number) => {
            if (i === progress) {
              if (i === total) {
                return (
                  <>
                    {now(i-1)}
                  </>
                )
              } else {
                return (
                  <>
                    {now(i-1)}
                    {now2wait()}
                  </>
                )
              }
            } else if (i < progress) {
              if (i+1 === progress) {
                return (
                  <>
                    {done(i-1)}
                    {done2now()}
                  </>
                )
              } else {
                return (
                  <>
                    {done(i-1)}
                    {done2done()}
                  </>
                )
              }
            } else if (i > progress) {
              if (i === total) {
                return (
                  <>
                    {wait(i-1)}
                  </>
                )
              } else {
                return (
                  <>
                    {wait(i-1)}
                    {now2wait()}
                  </>
                )
              }
            }
          })}
        </View>
      </View>
    </>
  )
}

export default Progressbar;
