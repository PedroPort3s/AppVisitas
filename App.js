import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Button, SafeAreaView, FlatList, Alert } from 'react-native';
import { format } from "date-fns";

export default function AppVisitas () 
{
  const [nome,setNome] = useState('');
  const [doc,setDoc] = useState('');
  const [placa,setPlaca] = useState('');
  const [visitantes,setVisitantes] = useState([]);

  function add() {
    if (nome == "" || doc == "") {
      Alert.alert("Atenção","Informe o nome e o documento do visitante!");
      return;
    }

    let vis = new Visitante(nome,doc,placa);

    let lstVisitantes = visitantes;

    lstVisitantes.push(vis);

    setVisitantes(lstVisitantes);

    setNome('');
    setDoc('');
    setPlaca('');

    console.log(visitantes);
  }

  function removerNaLista(item)  
  {
    let lstVisitantes = visitantes;

    const index = lstVisitantes.indexOf(item);

      if (index > -1) {
        lstVisitantes.splice(index, 1);
        setVisitantes([...lstVisitantes]);
      }
  }

  return(
    <View style={styles.container}>
      <Text>Nome</Text>
      <TextInput maxLength={50} value={nome} onChangeText={(txt) => setNome(txt)} style={styles.input}></TextInput>

      <Text>RG/CPF</Text>
      <TextInput maxLength={15} keyboardType='numeric' value={doc} onChangeText={(txt) => setDoc(txt)} style={styles.input}></TextInput>

      <Text>Placa do veiculo</Text>
      <TextInput maxLength={8} value={placa} onChangeText={(txt) => setPlaca(txt)} style={styles.input}></TextInput>

      <Pressable onPress={add} style={styles.btnInserir}>
        <Text style={styles.txtButton}>Cadastrar Visitante</Text>
      </Pressable>

      <ScrollView style={styles.lista}>
      <FlatList
          data={visitantes}
          keyExtractor={item => item.doc}
          extraData={visitantes}
          renderItem={({ item }) => {
            return (
              <View style={styles.txtLista}>
                  <View style={styles.separador}/>

                  <Text><Text style={styles.negrito}>Nome:</Text> {item.nome}</Text>
                  <Text><Text style={styles.negrito}>Documento:</Text> {item.doc}</Text>
                  <Text><Text style={styles.negrito}>Data visita:</Text> {item.dataVisita}</Text>
                  <Text><Text style={styles.negrito}>Placa do veículo:</Text> {item.placaVeiculo}</Text>

                  <Pressable onPress={()=> removerNaLista(item)} style={styles.btnSaida}>
                    <Text style={styles.txtButton}>Registrar Saida</Text>
                  </Pressable>

                  <View style={styles.separador}/>
                </View>
            );
          }}
        />          
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
    this.dataVisita = format(new Date(),"dd/MM/yyyy HH:mm:ss");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  negrito:{
    fontWeight:"bold"
  },
  separador:{
    height: 2,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    marginTop:10
  },
  btnInserir:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: 200,
    height: 30
  },
  btnSaida:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
    width: 200,
    height: 30
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
  },
  lista:{
    width:'100%'
  }
});



