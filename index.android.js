/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MusicFiles from 'react-native-get-music-files';
import Sound from 'react-native-sound';

export default class LyricsPlayer extends Component {
  constructor(props) {
    super(props);

    Sound.setCategory('Ambient', true);

    this.state = { song: null, sound: null, loading: false };
  }
  componentDidMount() {
    const song = {
      path: '/storage/emulated/0/Music/2581-best-eminem-2013/28-eminem-superman.mp3',
      title: 'Superman',
      author: 'Eminem'
    };
    const sound = new Sound(song.path, '', (error) => {
      console.log(song.path);
      if (error) {
        console.log('failed to load the sound', error);
        return;
      } 
      // loaded successfully
      console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());
    });
    this.setState({
      song,
      sound 
    })

    /*
    this.setState({loading: true})
    MusicFiles.get(
      (success) => {
        console.log(success);
        const song = success[59];
        const sound = new Sound(song.path, '', (error) => {
          console.log(song.path);
          if (error) {
            console.log('failed to load the sound', error);
            return;
          } 
          // loaded successfully
          console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());
        });
        this.setState({
          loading: false,
          song,
          sound 
        })
      },
      (error) => {
          console.log(error)
      }
    );*/
  }
  play = () => {
    this.state.sound.setVolume(1);
    this.state.sound.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }
  pause = () => {
     this.state.sound.pause();
  }
  stop = () => {
     this.state.sound.stop();
  }
  render() {
    const { loading, song } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to LyricsPlayer!
        </Text>
        { loading && 
          <Text style={styles.instructions}>
            loading...
          </Text>
        }
        { song && <View>
            <Text>{song.author} - {song.title}</Text>
            <Button
              onPress={this.play}
              title="Play"
            />
            <Button
              onPress={this.stop}
              title="Stop"
            />
            <Button
              onPress={this.pause}
              title="Pause"
            />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('LyricsPlayer', () => LyricsPlayer);
