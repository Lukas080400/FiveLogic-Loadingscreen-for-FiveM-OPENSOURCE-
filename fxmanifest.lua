fx_version 'cerulean'
game 'gta5'

author 'FiveLogic'
description 'FL Loading Screen'
version '1.0.0'

loadscreen 'html/index.html'
loadscreen_manual_shutdown 'yes'

files {
    'html/index.html',
    'html/style.css',
    'html/script.js',
    'html/img/*.png',
    'html/img/*.jpg',
    'html/music/*.mp3'
}

client_script 'client.lua'
server_script 'server.lua'
shared_script 'config.lua'

lua54 'yes'

-- Escrow protection
escrow_ignore {
    'config.lua',
    'html/*'
}