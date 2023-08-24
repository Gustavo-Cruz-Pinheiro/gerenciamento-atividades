import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text
} from 'react-native';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import DateTimePicker from '@react-native-community/datetimepicker';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const RegisterAtividade = ({ navigation }) => {
  let [titulo, setTitulo] = useState('');
  let [descricao, setDescricao] = useState('');
  let [data, setData] = useState(new Date());
  let [showPicker, setShowPicker] = useState(false);
  let [qtd_horas, setQtd_horas] = useState('');

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é indexado a partir de 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  let register_atividade = () => {

    console.log(titulo, descricao, data, qtd_horas);

    if (!titulo) {
      alert('Por favor, preencha o titulo!');
      return;
    }
    if (!descricao) {
      alert('Por favor, preencha a descrição!');
      return;
    }
    if (!data) {
      alert('Por favor, preencha a data!');
      return;
    }
    if (!qtd_horas) {
      alert('Por favor, preencha a quantidade de horas!');
      return;
    } else {
      db.transaction(function (tx) {
        data = formatDateToYYYYMMDD(data);
        tx.executeSql(
          'INSERT INTO table_atividade (titulo, descricao, data, qtd_horas) VALUES (?, ?, ?, ?)',
          [titulo, descricao, data, qtd_horas],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Atividade registrada com sucesso!',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('HomeScreen'),
                  },
                ],
                { cancelable: false }
              );
            } else alert('Falha ao registrar atividade!');
          }
        );
      });
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Preencha o titulo"
                value={titulo}
                onChangeText={
                  (titulo) => setTitulo(titulo)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Preencha a descrição"
                value={descricao}
                onChangeText={
                  (descricao) => setDescricao(descricao)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton title="Selecionar data" customClick={() => setShowPicker(true)} />
              <View style={{
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10
              }}>
                <Text>Data Selecionada: {format(data, 'dd/MM/yyyy', { locale: ptBR })}</Text>
              </View>
              {showPicker && (
                <DateTimePicker
                  value={data}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
              <Mytextinput
                placeholder="Preencha a quantidade de horas"
                value={'' + qtd_horas}
                onChangeText={
                  (qtd_horas) => setQtd_horas(qtd_horas)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mybutton title="Salvar" customClick={register_atividade} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterAtividade;