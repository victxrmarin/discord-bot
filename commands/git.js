const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const exampleEmbed = new EmbedBuilder()
  .setColor("Grey")
  .setTitle("Git Commands")
  .addFields(
    { name: "\u200B", value: "\u200B" },
    {
      name: "$ git init ",
      value: "Create a new local repository",
      inline: true,
    },
    {
      name: "$ git clone [url]",
      value: "Download a project and its entire version history",
      inline: true,
    },
    {
      name: "$ git stash",
      value:"Temporarily stores all modified monitored files",
      inline: true,
    },
    { name: "\u200B", value: "\u200B" },
    {
      name: "$ git status",
      value: "Review edits and create a commit transaction",
      inline: true,
    },
    {
      name: "$ git add [archive]",
      value: "Takes a snapshot of a file in preparation for versioning",
      inline: true,
    },
    {
      name: '$ git commit -m "[message]"',
      value:"Permanently writes the snapshot of the file to the version history",
      inline: true,
    },
    { name: "\u200B", value: "\u200B" },
    {
      name: "$ git branch",
      value: "List all local branches in the current repository",
      inline: true,
    },
    {
      name: "$ git branch [branch-name]",
      value: "Create a new branch",
      inline: true,
    },
    {
      name: "$ git switch -c [branch-name]",
      value:"Switch to the specified branch and update the working directory",
      inline: true,
    },
    { name: "\u200B", value: "\u200B" },
    {
      name: "$ git merge [branch-name]",
      value: "Combines the history of the specified branch with the current branch",
      inline: true,
    },
    {
      name: "$ git push [alias] [branch]",
      value: "Pushes all commits from the local branch to GitHub",
      inline: true,
    },
    {
      name: "$ git pull",
      value: "Download the history and incorporate the changes",
      inline: true,
    }
  );

module.exports = {
  data: new SlashCommandBuilder()
    .setName("git")
    .setDescription("Relembrar comandos do Git"),

  async execute(interaction) {
    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
