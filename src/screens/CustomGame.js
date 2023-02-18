import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as yup from 'yup';

import Checkbox from 'expo-checkbox';

import MyButton from '../components/MyButton';
import styles from '../styles/CustomGame';

const GameSchema = yup.object({

    timeLimit: yup.number().min(5).max(30).required(),
    randomNumCount: yup.number().min(4).max(10).required(),

    minKeyNum: yup.number().min(1).max(990).required().lessThan(yup.ref('maxKeyNum')),
    maxKeyNum: yup.number().min(10).max(999).required().moreThan(yup.ref('minKeyNum')),
})

export default function CustomGame({ navigation }) {

    const initialValues = { timeLimit: 10, randomNumCount: 6, minKeyNum: 1, maxKeyNum: 10, displayWinnings: false, hideStatus: false }

    function createGame(val) {
        navigation.popToTop();
        navigation.navigate('Game', val);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.instructions}>
                    <Text style={styles.instructText}>Instructions : </Text>
                    <Text style={styles.descText}>If fields are empty, then default values are considered.</Text>
                    <Text style={styles.descText}>Default values are shown in parenthesis.</Text>
                </View>
                <Formik
                    initialValues={initialValues}
                    validationSchema={GameSchema}
                    onSubmit={(val, actions) => {
                        actions.resetForm();
                        createGame(val);
                    }}
                >
                    {props =>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder='Time limit in seconds (10)'
                                onChangeText={val =>
                                    props.setFieldValue('timeLimit', parseInt(val ? val : initialValues.timeLimit))
                                }
                                value={props.values.timeLimit}
                                onBlur={props.handleBlur('timeLimit')}
                                keyboardType='numeric'
                            />
                            <Text style={styles.errorText}>{props.touched.timeLimit && props.errors.timeLimit}</Text>

                            <TextInput
                                style={styles.input}
                                placeholder='Number of Keys (6)'
                                onChangeText={val => props.setFieldValue('randomNumCount', parseInt(val ? val : initialValues.randomNumCount))}
                                value={props.values.randomNumCount}
                                onBlur={props.handleBlur('randomNumCount')}
                                keyboardType='numeric'
                            />
                            <Text style={styles.errorText}>{props.touched.randomNumCount && props.errors.randomNumCount}</Text>

                            <TextInput
                                style={styles.input}
                                placeholder='Min value of Key (1)'
                                onChangeText={val => props.setFieldValue('minKeyNum', parseInt(val ? val : initialValues.minKeyNum))}
                                value={props.values.minKeyNum}
                                onBlur={props.handleBlur('minKeyNum')}
                                keyboardType='numeric'
                            />
                            <Text style={styles.errorText}>{props.touched.minKeyNum && props.errors.minKeyNum}</Text>

                            <TextInput
                                style={styles.input}
                                placeholder='Max value of Key (10)'
                                onChangeText={val => props.setFieldValue('maxKeyNum', parseInt(val ? val : initialValues.maxKeyNum))}
                                value={props.values.maxKeyNum}
                                onBlur={props.handleBlur('maxKeyNum')}
                                keyboardType='numeric'
                            />
                            <Text style={styles.errorText}>{props.touched.maxKeyNum && props.errors.maxKeyNum}</Text>

                            <TouchableOpacity style={styles.section} onPress={() => props.setFieldValue('displayWinnings', !props.values.displayWinnings)}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={props.values.displayWinnings}
                                    onValueChange={val => props.setFieldValue('displayWinnings', val)}
                                    color={props.values.displayWinnings && '#1e90ff'}
                                />
                                <Text style={styles.paragraph}>Display the winning times of the game in sequence</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.section} onPress={() => props.setFieldValue('hideStatus', !props.values.hideStatus)}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={props.values.hideStatus}
                                    onValueChange={val => props.setFieldValue('hideStatus', val)}
                                    color={props.values.hideStatus && '#1e90ff'}
                                />
                                <Text style={styles.paragraph}>Hide status</Text>
                            </TouchableOpacity>

                            <MyButton text='Start' onPress={props.handleSubmit} disabled={!props.isValid} />
                        </View>
                    }
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    )
}
