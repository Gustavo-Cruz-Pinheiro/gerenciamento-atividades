import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewAllAtividade = () => {
  let [flatListItems, setFlatListItems] = useState([]);
  let [totalHoras, setTotalHoras] = useState(0);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_atividade',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            results.rows.item(i).data = formatDateToDDMMYYYY(new Date(results.rows.item(i).data));
            temp.push(results.rows.item(i));
          }
          setFlatListItems(temp);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT SUM(qtd_horas) AS soma FROM table_atividade;',
        [],
        (tx, results) => {
          setTotalHoras(results.rows.item(0).soma);
        }
      );
    });
  }, []);

  function formatDateToDDMMYYYY(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é indexado a partir de 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
  }

  let listItemView = (item) => {
    return (
      <View
        key={item.id}
        style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10, borderColor: 'lime', borderWidth: 3 }
        }>
        <Text style={styles.textheader}>Código</Text>
        <Text style={styles.textbottom}>{item.id}</Text>

        <Text style={styles.textheader}>Título</Text>
        <Text style={styles.textbottom}>{item.titulo}</Text>

        <Text style={styles.textheader}>Descrição</Text>
        <Text style={styles.textbottom}>{item.descricao}</Text>

        <Text style={styles.textheader}>Data</Text>
        <Text style={styles.textbottom}>{item.data}</Text>

        <Text style={styles.textheader}>Qtd de Horas</Text>
        <Text style={styles.textbottom}>{item.qtd_horas}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.textheader}>Total de Horas:</Text>
          <Text style={styles.textbottom}>{totalHoras}</Text>
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: '#111',
    fontSize: 12,
    fontWeight: '700',

  },
  textbottom: {
    color: '#111',
    fontSize: 18,
  },
});

export default ViewAllAtividade;