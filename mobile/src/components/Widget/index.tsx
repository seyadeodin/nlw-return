import React, { useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../theme';
import { Options } from '../Options';

export function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen(){
    bottomSheetRef.current?.expand();
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
        snapPoints={[1, 200]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        <Options/>
      </BottomSheet>
    </GestureHandlerRootView>

  )
}