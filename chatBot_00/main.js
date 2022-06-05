/*
Title: "REBD's chatBot_00 <3"
Author: RedEyesBadDragon
Version: 0.0.1

All source code for REBD can be 
found at: https://www.github/RedEyesBadDragon.com
*/


////////////////////////////////////////////////////////////////////////////////////////////
// Source framework of the code (Because this is literally the first time I've touched 
// javascript in my fucking life [*isn't it sooooo great I can just curse in comments now
//
// fuck 
//
// see? great. Fuck prof programming HAHAHAHAHAHAHAHAH :p 
//
// anyways*]
//
// so go easy on me. 
//
// Developed off of:
//      "Tip Menu Single Line Plus" bot
//      Author: badbedbubba
//      Version 1.0.0 (03/07/2016)
//
////////////////////////////////////////////////////////////////////////////////////////////


var  HEART    = '\u2665';     // ♥
    BDIAMOND  = '\u2666';     // ♦
   BSTAR      = '\u2605';     // ★

var tip_amt = 0;
var separator_char = "| ";
var msg;
var MAXITEMS=20;
var tipmenuprice = [];
var tipmenuitem= [];
var MAXSEP = 8;



separators = [
  {label:'Black Stone of Legend',shortcut:':heart2'},
  {label:'Red Eyes B. Chic',shortcut:':pixelglitter'},
  {label:'Black Metal Dragon',shortcut:':tinyflower2'},
  {label:'Red Eyes Wyvern',shortcut:':bluebow'},
  {label:'Red Eyes Black Dragon <3',shortcut:':pixelheart'},
  {label:'Red Eyes Darkness Metal',shortcut:':smile'},
  {label:'Red Eyes Flare Metal',shortcut:HEART},
  {label:'Red Eyes Ultimate',shortcut:BDIAMOND},
  //{label:'Text Star',shortcut:BSTAR},
]

cb.settings_choices = [
    {name: 'sepchar', type: 'choice', choice1: 'Black Stone of Legend', choice2:'Red Eyes B. Chic', choice3:'Black Metal Dragon', choice4:'Red Eyes Wyvern', choice5:'Red Eyes Black Dragon <3', choice6:'Red Eyes Darness Metal', choice7:'Red Eyes Flare Metal', choice8:'Red Eyes Ultimate', /*choice10:'Text Star',*/ defaultValue: 'Black Stone of Legend', label: "Separator character"},

    {name:'Black Stone of Legend', type:'str', label:
    'Request a facial expression or pose (like lewd / ahegao / head down ass up /etc)',},

    {name:'Red Eyes B. Chic', type:'str', required: false, label:
    'Q&A -> ask away shoot',},

    {name:'Black Metal Dragon', type:'str', required: false, label:
    'Song request 0.0 choose wisely lmfao',},

    {name:'Red Eyes Wyvern', type:'str', required: false, label:
    'Smash or pass- I will give my honest answer lmfao I will not rate answer if it is the pic of the viewer on live stream as to protect privacy I WILL answer for anything else tho live.',},

    {name:'Red Eyes Black Dragon <3', type:'str', required: false, label:
'Request an action (like wink :insert body part here lol / gape / say my name / etc etc)',},

    {name:'Red Eyes Darkness Metal', type:'str', required: false, label:
'How do you want my cumshot ??? (like spray my face / toward camera / etc etc warning if someone paid this before you I am sorry Uwu This is fulfilled first in first out FIFO)',},

    {name:'Red Eyes Flare Metal', type:'str', required: false, label:
'Add me on Valorant / Smite / (will add more) Let\'s play a game together lolols <3',},

    {name:'Red Eyes Ultimate', type:'str', required: false, label:
'Play a literal game of Yu-Gi-Oh on stream LMFAO (Can either be done with physical cards over priv chat/discord video call or on YGO MasterDuels) ... NO FTK DECKS MF 0.0 (I.E. if your first turn combo is taking 10 minutes u are not having fun) otherwise ***WE PLAY 0 BANS HERE MF -> that also means any ban is limit at 1. AGAIN NO FTK. Konami TCG follows otherwise. ***IF you WIN YOU get to pick another menu option :p for FREE <3 UwU',},

    {name:'noticecolor', type:'str', label:'Notice color (html code default red #FF0000)', defaultValue: '#FF0000'},
    {name: 'chat_ad', type:'int', minValue: 1, maxValue: 999, defaultValue: 1, label: 'Delay in minutes between notice being displayed (minimum 1)'}
];

cb.onTip(function (tip)
{
    tip_amt=parseInt(tip['amount']);

    for (var i = 1; i <= MAXITEMS; i++) {
        if (tip_amt == tipmenuprice[i]) {
            cb.sendNotice(tip['from_user'] + ' tipped for ' + tipmenuitem[i],'','',cb.settings['noticecolor'],'bold');

        }
    }

});

function chatAd() {

    if (msg!='Tip Menu: ') {
         cb.sendNotice(msg,'','',cb.settings['noticecolor'],'bold');
    }
    cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));
}
cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));

function init()
{

     for (i=0;i<=MAXSEP-1;i++) {
          if  (cb.settings['sepchar'] == separators[i].label) {
                separator_char = separators[i].shortcut + ' ';
          }
     }
    msg = 'Tip Menu: ';

    for (i=1;i<=MAXITEMS;i++) {
        var tmp;
        tmp=cb.settings['item' + i];
        if (tmp) {
             var arr= tmp.split('--');
             if (arr[1]===undefined) {
              cb.sendNotice('Error-You need two dashes to separate the tip amount and menu item for item no '+ i,'','',cb.settings['noticecolor'],'bold');
             } else {
             var amt=parseInt(arr[0]);
             if (amt>0) {
                 tipmenuprice[i]=amt;
                 tipmenuitem[i]=arr[1];
                 if (i>=2) {
                    msg += separator_char;
                 }
                 msg += arr[1] + '(' + amt + ') ';

             }
             }
       }
    }

     if (msg!= 'Tip Menu: ') {
          cb.sendNotice(msg,'','',cb.settings['noticecolor'],'bold');
     } else {
          cb.sendNotice('Error-No menu items found','','',cb.settings['noticecolor'],'bold');
     }
}

init();
