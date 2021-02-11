const { MessageEmbed } = require("discord.js")
const db = require('quick.db');
module.exports.run = async (client, message, users, args) => {

if(!message.member.roles.cache.some(r => ['809095577094586407'].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
    
//------------------------------------------------KAYITLAR-----------------------------------------------\\  

let user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let isim = message.mentions.members.first() || message.guild.members.get(args[0]);//Useri tanımladık
var sayi = 1 //Sıralam için sayı tanımladık
let data = db.get(`isim.${message.guild.id}`)//İsim verisini data diye tanımladık
let rol = db.fetch(`rol.${message.guild.id}`)
if(!data) return message.channel.send(new MessageEmbed()
    .setColor("#a22a2a") 
    .setThumbnail(user.user.avatarURL ({ dynamic: true}))      
    .setDescription(`${isim} Adlı Kullanıcı Daha Önce Kayıt Olmamış.`))
let isimler = data.filter(x => x.userID === isim.id).map(x => `${sayi++}- \`• ${x.isim} | ${x.yas}\`  (<@&${x.role}>)\n`).join("\n")
if(isimler === null) isimler = "Kullanıcı hiç kayıt olmamış"
if(isimler === undefined) isimler = "Kullanıcı hiç kayıt olmamış"
//------------------------------------------------KAYITLAR-----------------------------------------------\\      


const embed = new MessageEmbed()
        .setThumbnail(user.user.avatarURL ({ dynamic: true}))     
    .setAuthor(`Bu Kullanıcı ${sayi-1} Kere Kayıt Olmuş`) 
    .setDescription(` Kullanıcının Eski İsimleri:
    ${isimler}`)
    .setColor("#e6c47e")
message.channel.send(embed)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['isimler', 'eski-isim'],
  permLevel: 0,
}

exports.help = {
      name: "isimler"
  
}