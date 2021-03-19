import React, { Component } from "react";

import { Image, StyleSheet, ScrollView, TextInput } from "react-native";
import Slider from "react-native-slider";
import { Divider, Block, Text, Switch } from "../component";
import { theme, mocks } from "../constants";
import { profile } from "../constants/mocks";

class Settings extends Component {
  state = {
    budget: 850,
    monthly: 1700,
    notifications: true,
    newsletter: false,
    editing: null,
    profile: {}
  };



  handleEdit(name, text) {
    const { profile } = this.state;
    profile[name] = text;

    this.setState({ profile });
  }

  toggleEdit(name) {
    const { editing } = this.state;
    this.setState({ editing: !editing ? name : null });
  }

  renderEdit(name) {
    const { profile, editing } = this.state;

    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={text => this.handleEdit([name], text)}
        />
      );
    }

    return <Text bold>{profile[name]}</Text>;
  }

  render() {
    const { profile, editing } = this.state;
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Settings
          </Text>
          <Image source={this.props.profile.avatar} style={styles.avatar} />
        </Block>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Username
                </Text>
                {this.renderEdit("username")}
              </Block>
              <Text
                medium
                style={{color: "#0AC4BA"}}
                onPress={() => this.toggleEdit("username")}
              >
                {editing === "username" ? "Save" : "Edit"}
              </Text>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Location
                </Text>
                {this.renderEdit("location")}
              </Block>
              <Text
                medium
                style={{color: "#0AC4BA"}}
                onPress={() => this.toggleEdit("location")}
              >
                {editing === "location" ? "Save" : "Edit"}
              </Text>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  E-mail
                </Text>
                <Text bold>{this.props.profile.email}</Text>
              </Block>
            </Block>
          </Block>

          <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />

          <Block style={styles.sliders}>
            <Block margin={[10, 0]}>
              <Text gray2 style={{ marginBottom: 10 }}>
                Budget
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={1000}
                style={{ height: 19 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 6, borderRadius: 6 }}
                minimumTrackTintColor="#0AC4BA"
                maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                value={this.state.budget}
                onValueChange={value => this.setState({ budget: value })}
              />
              <Text caption gray right>&
                $1,000
              </Text>
            </Block>
           
          </Block>

          <Divider />

          <Block style={styles.toggles}>
            <Block
              row
              center
              space="between"
              style={{ marginBottom: theme.sizes.base * 2 }}
            >
              <Text gray2>Notifications</Text>
              <Switch
                value={this.state.notifications}
                onValueChange={value => this.setState({ notifications: value })}
              />
            </Block>

            <Block
              row
              center
              space="between"
              style={{ marginBottom: theme.sizes.base * 2 }}
            >
              <Text gray2>Newsletter</Text>
              <Switch
                value={this.state.newsletter}
                onValueChange={value => this.setState({ newsletter: value })}
              />
            </Block>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

Settings.defaultProps = {
  profile: mocks.profile
};  

console.log(profile)

export default Settings;

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  inputRow: {
    alignItems: "flex-end"
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: "#0AC4BA"
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2
  }
});
