import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Button, RefreshControlBase } from 'react-native';

export default function AppVisitas () 
{
  const [nome,setNome] = useState('');
  const [doc,setDoc] = useState('');
  const [placa,setPlaca] = useState('');

  const [visitantes,setVisitantes] = useState([]);

  add = () => {
    var vis = new Visitante(nome,doc,placa,setPlaca);

    let lstVisitantes = visitantes;

    lstVisitantes.push(vis);

    setVisitantes(lstVisitantes);

    console.log(visitantes);
  }

  const remover = (item) =>  
  {
    let lstVisitantes = visitantes;

    const index = lstVisitantes.indexOf(item);
      if (index > -1) {
        lstVisitantes.splice(index, 1);
      }

    setVisitantes(lstVisitantes);
  }

  return(
    <View style={styles.container}>
      <Text>Nome</Text>
      <TextInput onChangeText={(txt) => setNome(txt)} style={styles.input}></TextInput>

      <Text>Rg/CPF</Text>
      <TextInput onChangeText={(txt) => setDoc(txt)} style={styles.input}></TextInput>

      <Text>Placa do veiculo</Text>
      <TextInput onChangeText={(txt) => setPlaca(txt)} style={styles.input}></TextInput>

      <Pressable onPress={add} style={styles.btnInserir}>
        <Text style={styles.txtButton}>Inserir</Text>
      </Pressable>

      <ScrollView style="auto">
          {
            visitantes.map((y) => {
              return (
                <View style={styles.txtLista}>
                  <Text>Nome {y.nome}</Text>
                  <Text>Documento {y.doc}</Text>
                  <Text>Data visita {y.dataVisita}</Text>
                  <Text>Placa do veículo {y.placaVeiculo}</Text>
                  <Pressable onPress={remover(y)} style={styles.btnInserir}>
                    <Text style={styles.txtButton}>Remover</Text>
                  </Pressable>
                </View>
                );
            })
          }
      </ScrollView>

      <StatusBar style="auto" />

    </View>
  );
}

class Visitante
{
  constructor(nome, doc, placaVeiculo)
  {
    this.nome = nome;
    this.doc = doc;
    this.placaVeiculo = placaVeiculo;
    this.dataVisita = Date.now();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnInserir:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  txtButton:{
    color:'white'
  },
  txtLista:{
    color:'red'
  },
  input: {
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop:10,
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});



