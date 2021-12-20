import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface TaskProps {
  id: number;
  title: string;
  done: boolean;
}

export interface EditTaskProps {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task

    const taskAlreadyRegistered = tasks.find(task => task.title === newTaskTitle);

    if (taskAlreadyRegistered) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task }));

    const taskDone = updatedTasks.find(task => task.id === id);

    if (taskDone) {
      taskDone.done = !taskDone.done;
      setTasks(updatedTasks);
      return;
    }

    setTasks(tasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state

    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [{ text: 'Não' }, {
      text: 'Sim', onPress: () => {
        setTasks(oldState => oldState.filter(
          task => task.id !== id
        ));
      }
    }]);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const taskSelected = updatedTasks.find(task => task.id === taskId);

    if (!taskSelected)
      return;

    taskSelected.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        editTask={() => handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})