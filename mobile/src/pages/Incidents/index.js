import React, {useState, useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

import logoImg from '../../essets/logo.png';

import styles from './style';

export default function Incidents(){
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident){
    navigation.navigate('Detail', {incident});
  } 

  async function loadIncidents(){
    if(loading){
      return;
    }

    if(total > 0 && incidents.length === total){
      return;
    }

    setLoading(true);

    //const response = await api.get(`incidents?page${page}`);
    const response = await api.get('incidents',{
      params: {page}
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['X-Total-Count']);
    setPage(page +1);
    setLoading(false);
  }

  useEffect(()=>{
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headertextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.description}>Escolha um dos caos abaixo e salve o dia!</Text>

      <FlatList
        data={incidents}
        style={styles.incidentlist}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident })=>(
          <View style={styles.incident}>
            <Text style={styles.incidentPropety}>Ong: </Text>
            <Text style={styles.incidentValue}>{incident.name} </Text>

            <Text style={styles.incidentPropety}>Caso: </Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentPropety}>Valor: </Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(incident.value)}</Text>

            <TouchableOpacity style={styles.detailButton} onPress={() => navigateToDetail(incident)}>
              <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02141" />
            </TouchableOpacity>
          </View>
        )}
      />

      </View>
  );
}