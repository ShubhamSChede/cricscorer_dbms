import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

interface Player {
    name: string;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    strikeRate: number;
}

const players: Player[] = [
    { name: 'Sushil', runs: 30, balls: 10, fours: 3, sixes: 1, strikeRate: 120.00 },
    { name: 'Kunal', runs: 45, balls: 30, fours: 5, sixes: 2, strikeRate: 150.00 },
    { name: 'Deep', runs: 30, balls: 25, fours: 3, sixes: 1, strikeRate: 120.00 },
];

const Scorecard = () => {
    return (
        <ImageBackground
            source={require('../../assets/images/mainscreen.png')}
            style={styles.container}
        >
            <View style={styles.scorecardContainer}>
                <Text style={styles.TITLE}> HOTSHOTS </Text>
                <View style={styles.row}>
                    <Text style={[styles.headerText, styles.batsmanColumn]}>Batsman</Text>
                    <Text style={[styles.headerText, styles.runsColumn]}>R</Text>
                    <Text style={[styles.headerText, styles.ballsColumn]}>B</Text>
                    <Text style={[styles.headerText, styles.foursColumn]}>4s</Text>
                    <Text style={[styles.headerText, styles.sixesColumn]}>6s</Text>
                    <Text style={[styles.headerText, styles.srColumn]}>SR</Text>
                </View>

                {players.map((player, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={[styles.dataText, styles.batsmanColumn]}>{player.name}</Text>
                        <Text style={[styles.dataText, styles.runsColumn]}>{player.runs}</Text>
                        <Text style={[styles.dataText, styles.ballsColumn]}>{player.balls}</Text>
                        <Text style={[styles.dataText, styles.foursColumn]}>{player.fours}</Text>
                        <Text style={[styles.dataText, styles.sixesColumn]}>{player.sixes}</Text>
                        <Text style={[styles.dataText, styles.srColumn]}>{player.strikeRate.toFixed(2)}</Text>
                    </View>
                ))}

                <View style={styles.row}>
                    <Text style={styles.footerText}>Total</Text>
                    <Text style={styles.footerDataText}>100/2 (12.4/20)</Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TITLE:{
        fontSize:28,
    },
    scorecardContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
    },
    dataText: {
        fontSize: 16,
        color: 'black',
    },
    footerText: {
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
        color: 'black',
    },
    footerDataText: {
        fontSize: 18,
        textAlign: 'right',
        flex: 1,
        color: 'black',
    },
    batsmanColumn: {
        flex: 2,
    },
    runsColumn: {
        flex: 1,
        textAlign: 'center',
    },
    ballsColumn: {
        flex: 1,
        textAlign: 'center',
    },
    foursColumn: {
        flex: 1,
        textAlign: 'center',
    },
    sixesColumn: {
        flex: 1,
        textAlign: 'center',
    },
    srColumn: {
        flex: 1,
        textAlign: 'center',
    },
});

export default Scorecard;
