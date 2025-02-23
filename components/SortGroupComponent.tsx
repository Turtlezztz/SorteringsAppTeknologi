import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PopupComponentProps {
  sortingGroup: any; // Replace 'any' with your specific type
  visible: boolean;
  onClose: () => void;
}

const PopupComponent: React.FC<PopupComponentProps> = ({ sortingGroup, visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Sorting Group</Text>
          <Text style={styles.content}>
            {JSON.stringify(sortingGroup, null, 2)}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popup: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20
  },
  closeButton: {
    alignSelf: 'flex-end'
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  content: {
    fontSize: 16
  }
});

export default PopupComponent;