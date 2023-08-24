import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView
} from 'react-native';

import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const UpdateAtividade = ({ navigation }) => {
  let [inputAtividadeId, setInputAtividadeId] = useState('');
  let [atividadeTitulo, setAtividadeTitulo] = useState('');
  let [atividadeDescricao, setAtividadeDescricao] = useState('');
  let [atividadeData, setAtividadeData] = useState(new Date());
  let [atividadeQtd_horas, setAtividadeQtd_horas] = useState('');
  let updateAllStates = (titulo, descricao, data, qtd_horas) => {
    setAtividadeTitulo(titulo);
    setAtividadeDescricao(descricao);
    setAtividadeData(data);
    setAtividadeQtd_horas(qtd_horas);
  };
  let searchAtividade = () => {
    console.log(inputAtividadeId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_atividade where id = ?',
        [inputAtividadeId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.titulo,
              res.descricao,
              res.data,
              res.qtd_horas
            );
          } else {
            alert('Atividade não encontrada!');
            updateAllStates('', '', '', '');
          }
        }
      );
    });
  };
  let updateAtividade = () => {
    console.log(inputAtividadeId, atividadeTitulo, atividadeDescricao, atividadeData, atividadeQtd_horas);

    if (!inputAtividadeId) {
      alert('Por Favor informe o Código!');
      return;
    }
    if (!atividadeTitulo) {
      alert('Por favor, preencha o titulo!');
      return;
    }
    if (!atividadeDescricao) {
      alert('Por favor, preencha a descrição!');
      return;
    }
    if (!atividadeData) {
      alert('Por favor, preencha a data!');
      return;
    }
    if (!atividadeQtd_horas) {
      alert('Por favor, preencha a quantidade de horas!');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_atividade set titulo=?, descricao=? , data=?, qtd_horas=? where id=?',
        [atividadeTitulo, atividadeDescricao, atividadeData, atividadeQtd_horas, inputAtividadeId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Atividade atualizada com sucesso!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao atualizar a atividade!');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytext text="Filtro de Atividade" />
              <Mytextinput
                placeholder="Entre com o Código da Atividade"
                style={{ padding: 10 }}
                onChangeText={
                  (inputAtividadeId) => setInputAtividadeId(inputAtividadeId)
                }
              />
              <Mybutton
                title="Buscar Atividade"
                customClick={searchAtividade}
              />
              <Mytextinput
                placeholder="Preencha o titulo"
                value={atividadeTitulo}
                onChangeText={
                  (atividadeTitulo) => setAtividadeTitulo(atividadeTitulo)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Preencha a descrição"
                value={atividadeDescricao}
                onChangeText={
                  (atividadeDescricao) => setAtividadeDescricao(atividadeDescricao)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mytextinput
                placeholder="Preencha a data"
                value={atividadeData}
                onChangeText={
                  (atividadeData) => setAtividadeData(atividadeData)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Preencha a quantidade de horas"
                value={'' + atividadeQtd_horas}
                onChangeText={
                  (atividadeQtd_horas) => setAtividadeQtd_horas(atividadeQtd_horas)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mybutton
                title="Atualizar Atividade"
                customClick={updateAtividade}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateAtividade;