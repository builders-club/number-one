import { AMA } from "./commands/ama";
import { Attention } from "./commands/attention";
import { Awesum } from "./commands/awesum";
import { AwesumRepo } from "./commands/awesumrepo";
import { Blog } from "./commands/blog";
import { Conduct } from "./commands/conduct";
import { Discord } from "./commands/discord";
import { Fart } from "./commands/fart";
import { FFL } from "./commands/ffl";
import { Font } from "./commands/font";
import { GitHub } from "./commands/github";
import { Giving } from "./commands/giving";
import { Hardware } from "./commands/hardware";
import { Heroines } from "./commands/heroines";
import { Hype } from "./commands/hype";
import { Instagram } from "./commands/instagram";
import { Keyboard } from "./commands/keyboard";
import { LiveCoders } from "./commands/livecoders";
import { POBox } from "./commands/pobox";
import { Project } from "./commands/project";
import { Stop } from "./commands/stop";
import { Theme } from "./commands/theme";
import { Command } from "./models/Command";

export abstract class CommandRegistry {
  private static commands: [Command?] = []

  public static init() {
    this.commands.push(new Command('ama', AMA))
    this.commands.push(new Command('attention', Attention))
    this.commands.push(new Command('awesum', Awesum))
    this.commands.push(new Command('awesumrepo', AwesumRepo))
    this.commands.push(new Command('blog', Blog))
    this.commands.push(new Command('conduct', Conduct))
    this.commands.push(new Command('discord', Discord))
    this.commands.push(new Command('fart', Fart))
    this.commands.push(new Command('ffl', FFL))
    this.commands.push(new Command('font', Font))
    this.commands.push(new Command('github', GitHub))
    this.commands.push(new Command('giving', Giving))
    this.commands.push(new Command('hardware', Hardware))
    this.commands.push(new Command('heroines', Heroines))
    this.commands.push(new Command('hype', Hype))
    this.commands.push(new Command('instagram', Instagram))
    this.commands.push(new Command('keyboard', Keyboard))
    this.commands.push(new Command('livecoders', LiveCoders))
    this.commands.push(new Command('pobox', POBox))
    this.commands.push(new Command('project', Project))
    this.commands.push(new Command('stop', Stop))
    this.commands.push(new Command('theme', Theme))
  }

  public static getCommand(commandName: string): Command | undefined {
    return this.commands.find(f => f.commandName === commandName)
  }
}