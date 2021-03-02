/**
 * @fileoverview Guild related methods.
 */

const config = require('config');

const { getClient } = require('../../../services/discord.service');

const entity = (module.exports = {});

/**
 * Gets the guildmember instance from a discord message instance.
 *
 * @param {DiscordMessage} message A discord member instance.
 * @return {Promise<DiscordGuildMember>} Returns the guildmember instance.
 */
entity.getGuildMember = async (message) => {
  const guildMember = await getClient()
    .guilds.cache.get(config.discord.guild_id)
    .members.fetch(message.author.id);

  return guildMember;
};

/**
 * Gets the guildmember instance from a localMember record.
 *
 * @param {Member} localMember A local member record.
 * @return {Promise<DiscordGuildMember>} Returns the guildmember instance.
 */
entity.getGuildMemberLocal = async (localMember) => {
  const guildMember = await getClient()
    .guilds.cache.get(config.discord.guild_id)
    .members.fetch(localMember.discord_uid);

  return guildMember;
};

/**
 * Gets the Guild Object the bot is responsible for.
 *
 * @return {Promise<DiscordGuild>} Returns the guild instance.
 */
entity.getGuild = async () => {
  const guild = await getClient().guilds.cache.get(config.discord.guild_id);

  return guild;
};
