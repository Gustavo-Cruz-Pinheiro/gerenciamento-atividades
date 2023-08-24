import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewAtividade = () => {
  let [inputAtividadeId, setInputAtividadeId] = useState('');
  let [atividadeDados, setAtividadeDados] = useState({});

  let searchAtividade = () => {
    console.log(inputAtividadeId);
    setAtividadeDados({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_atividade where id = ?',
        [inputAtividadeId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            results.rows.item(0).data = formatDateToDDMMYYYY(new Date(results.rows.item(0).data));

            setAtividadeDados(results.rows.item(0));
          } else {
            alert('Atividade não encontrada!');
          }
        }
      );
    });
  };

  function formatDateToDDMMYYYY(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é indexado a partir de 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Filtro de Atividade" />
          <Mytextinput
            placeholder="Preencha com o Código da Atividade"
            onChangeText={
              (inputAtividadeId) => setInputAtividadeId(inputAtividadeId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Buscar Atividade" customClick={searchAtividade} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>Código: {atividadeDados.id}</Text>
            <Text>Título: {atividadeDados.titulo}</Text>
            <Text>Descrição: {atividadeDados.descricao}</Text>
            <Text>Data: {atividadeDados.data}</Text>
            <Text>Qtd de horas: {atividadeDados.qtd_horas}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAtividade;