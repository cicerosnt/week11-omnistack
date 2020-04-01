import React from 'react';
import {Feather} from '@expo/vector-icons';
import {View, Linking, Image, Text, TouchableOpacity} from 'react-native';
import * as MailCompose from 'expo-mail-composer';
import {useNavigation, useRoute} from '@react-navigation/native';

import logoImg from '../../essets/logo.png';

import styles from './style';

export default function Detail(){
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;

  const message = `Olá Ligeirinhos! Estou entrando em contato pois quero ajudar com 
  o caso ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(incident.value)}` ;

  function navigateBack(){
    navigation.goBack();
  }
  function sendMail(){
    MailCompose.composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [`${incident.email}`],
      body: message,
    })
  }
  function sendWatsapp(){
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <TouchableOpacity style={styles.detailButton} onPress={navigateBack}>
          <Feather name="arrow-left" size={25} color="#e02141" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentPropety, {marginTop: 0}]}>Ong: </Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf} 
          </Text>

        <Text style={styles.incidentPropety}>Caso: </Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentPropety}>Valor: </Text>
        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(incident.value)} </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o Herói deste caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
            <Feather name="arrow-right" size={16} color="#e02141" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
            <Feather name="arrow-right" size={16} color="#e02141" />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}