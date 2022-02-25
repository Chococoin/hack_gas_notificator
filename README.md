##  🧑🏿‍💻 HACK GAS ⛽ NOTIFICATOR 👩‍💻

Para usar el Hack Gas Nofificator

```
git clone https://github.com/chococoin/hack_gas_notificator && cd hack_gas_notificator
```

```
npm install
```
1.- Renombra el file .env_example por .env y reemplaza los valores entre '<>' por los valores de las Api key o tokens que te den las plataformas etherscan.io, twilio.com y sendgrid.com. Establece en GAS_TARGET el precio en Gwei en el que esperas estar informado.

2.- Hardcodea en app.js en la linea 20 el email del usuario que recibirá la notificación. En la linea 21 el numero de teléfono con el prefijo internacional, ej. +58414123456 para Venezuela. En la linea 24 el email validado por sendgrid.


```
npm start
```

Si deseas poner en producción el daemon instala pm2 y ejecutalo:
```
npm install -g pm2
pm2 start app.js
```