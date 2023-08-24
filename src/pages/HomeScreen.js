import React, { useEffect } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import MyImageButton from './components/MyImageButton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_atividade'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_atividade', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_atividade(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(60), descricao text, data date, qtd_horas INT(10))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <MyImageButton
              title="Registrar Atividade"
              btnColor='#00FFFF'
              btnIcon="plus"
              customClick={() => navigation.navigate('Register')}
            />

            <MyImageButton
              title="Atualizar Atividade"
              btnColor='#006400'
              btnIcon="pencil"
              customClick={() => navigation.navigate('Update')}
            />

            <MyImageButton
              title="Visualizar Atividade"
              btnColor='#D2691E'
              btnIcon="eye"
              customClick={() => navigation.navigate('View')}
            />
            <MyImageButton
              title="Visualizar Todas"
              btnColor='#4B0082'
              btnIcon="list"
              customClick={() => navigation.navigate('ViewAll')}
            />
            <MyImageButton
              title="Excluir Atividade"
              btnColor='#DC143C'
              btnIcon="trash"
              customClick={() => navigation.navigate('Delete')}
            />
            <MyImageButton
              title="Ver por Data"
              btnColor='#808000'
              btnIcon="calendar"
              customClick={() => navigation.navigate('ViewByDate')}
            />
          </View>
        </View>
        <Text
          style={{
            fontSize: 17,
            textAlign: 'center',
            color: '#000000',
            backgroundColor: '#DCDCDC',
          }}>
          Aplicação Mobile para Gerenciamento de Atividades Extracurriculares com React Native e SQLite
        </Text>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
            color: '#000000',
            backgroundColor: '#DCDCDC',
          }}>
          Desenvolvido por: Gustavo Cruz Pinheiro
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;