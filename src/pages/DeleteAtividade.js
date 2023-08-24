import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const DeleteAtividade = ({ navigation }) => {
  let [inputAtividadeId, setInputAtividadeId] = useState('');

  let deleteAtividade = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM table_atividade where id=?',
        [inputAtividadeId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Atividade Excluída com Sucesso!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Por favor entre com um código válido de Atividade!');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Digite o Código da Atividade"
            onChangeText={
              (inputAtividadeId) => setInputAtividadeId(inputAtividadeId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Excluir Atividade" customClick={deleteAtividade} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteAtividade;