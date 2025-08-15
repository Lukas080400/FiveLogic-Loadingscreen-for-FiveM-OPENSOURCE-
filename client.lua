local spawn1 = false

RegisterNUICallback('getConfig', function(data, cb)
    cb(Config)
end)

AddEventHandler("playerSpawned", function()
    if not spawn1 then
        ShutdownLoadingScreenNui()
        spawn1 = true
    end
end)

CreateThread(function()
    while not spawn1 do
        local loadingProgress = math.random(0, 100) / 100
        SendNUIMessage({
            eventName = 'loadProgress',
            loadFraction = loadingProgress
        })
        Wait(500)
    end
end)