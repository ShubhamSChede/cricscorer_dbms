import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ImageBackground, 
  ActivityIndicator, 
  FlatList, 
  RefreshControl,
} from 'react-native';

interface TotalRuns {
  id: string;
  inningsId: string;
  runs: number;
  wickets: number;
  overs: number;
  createdAt: string;
}

interface Innings {
  id: string;
  inningsNumber: number;
  inningsType: string;
  totalRuns: TotalRuns[];
  createdAt: string;
}

interface Result {
  winnerId: string;
}

interface Match {
  id: string;
  team1Id: string;
  team2Id: string;
  overs: string | null;
  createdAt: string;
  result?: Result[];
  innings: Innings[];
}

const LiveMatchesSpectator = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLiveMatches = async () => {
    try {
      const response = await fetch('https://cricscorer-backend.onrender.com/api/v1/matches');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('API Response:', JSON.stringify(data.matches[0], null, 2));
      if (data && Array.isArray(data.matches)) {
        setMatches(data.matches);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLiveMatches();
  }, []);  

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  const renderMatchItem = ({ item }: { item: Match }) => {
    console.log('Match result:', item.result);
    
    const hasResult = item.result && Array.isArray(item.result) && item.result.length > 0;
    const winner = hasResult ? item.result[0].winnerId : null;
    
    console.log('Has result:', hasResult);
    console.log('Winner ID:', winner);
    console.log('Team1 ID:', item.team1Id);
    console.log('Team2 ID:', item.team2Id);
    
    const isTeam1Winner = winner === item.team1Id;
    const isTeam2Winner = winner === item.team2Id;

    return (
      <View style={styles.matchItem}>
        <View style={styles.matchHeader}>
          <Text style={styles.dateText}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.teamsContainer}>
          <View style={styles.teamRow}>
            <Text style={styles.teamText}>Team 1</Text>
            <Text style={styles.teamId}>{item.team1Id.slice(0, 8)}</Text>
          </View>
          <Text style={styles.vsText}>vs</Text>
          <View style={styles.teamRow}>
            <Text style={styles.teamText}>Team 2</Text>
            <Text style={styles.teamId}>{item.team2Id.slice(0, 8)}</Text>
          </View>
        </View>

        <Text style={styles.winnerText}>
          {hasResult 
            ? (isTeam1Winner 
                ? 'Team 1 won' 
                : isTeam2Winner 
                  ? 'Team 2 won' 
                  : 'Match Drawn')
            : 'Match in progress'}
        </Text>

        <View style={styles.scoreboardContainer}>
          {item.innings.map((innings, index) => (
            <View key={innings.id} style={styles.scoreColumn}>
              <Text style={styles.inningsLabel}>{`${index + 1}${getOrdinalSuffix(index + 1)} Innings`}</Text>
              <View style={styles.scoreBox}>
                <Text style={styles.runsText}>
                  {innings.totalRuns[0].runs}/{innings.totalRuns[0].wickets}
                </Text>
                <Text style={styles.oversText}>
                  ({innings.totalRuns[0].overs.toFixed(1)} ov)
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Helper function to get ordinal suffix (1st, 2nd, etc.)
  const getOrdinalSuffix = (num: number): string => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/mainscreen.png')}
        style={styles.background}
        resizeMode="cover"
      >
        {loading && !refreshing ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={matches}
            renderItem={renderMatchItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#0000ff']}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No matches available</Text>
              </View>
            }
          />
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  list: {
    padding: 20,
  },
  matchItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  teamsContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  teamText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    flex: 1,
  },
  teamId: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 10,
  },
  vsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 4,
  },
  scoreboardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  scoreColumn: {
    flex: 1,
    alignItems: 'center',
  },
  inningsLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  scoreBox: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 100,
  },
  runsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  oversText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  winnerText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default LiveMatchesSpectator;