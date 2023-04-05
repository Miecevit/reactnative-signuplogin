import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';

import logo from '../assets/100ky.png';

const Logo = (props) =>{

  const birlesikStyle = 
    StyleSheet.flatten([styles.logo, props.style]);

  return(
    <Image
      style={birlesikStyle}
      source={logo}
      />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 125,
    alignSelf: 'center',
    marginBottom: 50,
  }
});

export default Logo;

