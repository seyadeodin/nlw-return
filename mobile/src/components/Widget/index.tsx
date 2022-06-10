import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler';

import { Options } from '../Options';
import { Form } from '../Form';

import { feedbackTypes } from '../../utils/feedbackTypes';
import { styles } from './styles';
import { theme } from '../../theme';
import { Success } from '../Success';

export type FeeedbackType = keyof typeof feedbackTypes;

export function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeeedbackType | null>()
  const [feedbackSent, setFeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen(){
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback(){
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  async function handleFeedbackSent(){
    setFeedbackSent(true);
  }

  return(
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight='bold'
        />
      </TouchableOpacity>


      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 300]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {/* <Success /> */}
        {
          feedbackSent ?
          <Success 
            onSendNewFeedback={handleRestartFeedback}
          />
          :
          (feedbackType ? 
            <Form
              feedbackType={feedbackType}
              onFeedbackCanceled={handleRestartFeedback}
              onFeedbackSent={() => handleFeedbackSent()}
            />
            :
            <Options
              onFeedbackTypeChanged={setFeedbackType}
            />
          )
        }
      </BottomSheet>
    </GestureHandlerRootView>

  )
}
