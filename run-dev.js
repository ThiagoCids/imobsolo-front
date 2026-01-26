const { spawn } = require('child_process');
const path = require('path');

const proc = spawn('npm', ['run', 'dev'], {
  cwd: 'C:\\Users\\dfeni\\Desktop\\VaiNaWeb\\ImobSolo\\imobsolo-front',
  stdio: 'inherit',
  shell: true
});

proc.on('error', (err) => {
  console.error('Erro ao rodar dev:', err);
});
