import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';
import { render } from 'react-dom';



let board = [];
let board1 = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const NBR_OF_CAT = 6;
const BONUS = 63;

export default function Gameboard() {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [buttonTxt, setButtonTxt] = useState();
    const [total, setTotal] = useState(0);
    const [points, setPoints] = useState(BONUS);


    function getDiceColor(i) {
        if (board.every((val, i, arr) => val === arr[0])) {
            return "orange";
        } else {
            return selectedDices[i] ? "black" : "steelblue";
        }
    }

    function getCatColor(i) {

    }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    function throwDices() {
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    }

    function checkWinner() {
        if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
            setStatus('YOU WON');
            setButtonTxt('New game');
        } else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
            setStatus('You won, game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
            setButtonTxt('New game');
        } else if (nbrOfThrowsLeft === 0) {
            setStatus('Game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
            setButtonTxt('New game');
        } else {
            setStatus('Keep on throwing');
            setButtonTxt('Throw dices');
        }
    }


    useEffect(() => {
        checkWinner();
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Start the game');
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
        }
    }, [nbrOfThrowsLeft]);

    const row = [];
    for (let i = 0; i< NBR_OF_DICES; i++) {
            row.push(
        <Pressable
                key = {"row" + i}
                onPress = {() => selectDice(i)}>
            <MaterialCommunityIcons
                    name = {board[i]}
                    key = {"row" + i}
                    size = {50}                        
                    color = {getDiceColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        );
    }

    function selectCat() {
        for (let i = 0; i < NBR_OF_CAT +1; i++) {
            board1[i] = 'numeric-' + i + '-circle';
        }
    }

    const rowNum = [];
    for (let i = 0; i< NBR_OF_CAT; i++) {
            rowNum.push(
        <Pressable
                key = {"rowNum" + i}
                onPress = {() => selectPoints(i)}>
            <MaterialCommunityIcons
                    name = {board1[i]}
                    key = {"rowNum" + i}
                    size = {50}                        
                    color = {getCatColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        );
    }

/*     function initialize() {
        const cat = [];
        for (let i = 0; i< NBR_OF_CAT; i++) {
            cat.push(
                <Pressable
                    key = {"cat" + i}
                    onPress = {() => selectCat(i)}>
                        <MaterialCommunityIcons
                            name = {}
                            >
                                </MaterialCommunityIcons>
                </Pressable>
            )
        }
    } */

    return(
        <View style = {styles.gameboard}>
            <View style = {styles.flex}>{row}</View>
            <Text style = {styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style = {styles.gameinfo}>{status}</Text>
            <Pressable style = {styles.button}
                    onPress = {() => throwDices()}>
                <Text style = {styles.buttonText}>{buttonTxt}</Text>
            </Pressable>
            <Text style = {styles.total}>Total: {total}</Text>
            <Text>You are {points} points away from bonus.</Text>
            <View style = {styles.flex}>{rowNum}</View>
        </View>
    )
}