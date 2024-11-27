//const chalk = require('chalk');

// console.log(chalk.blue("este texto es de color azul"));
// console.log(chalk.red.bold("este texto es de color rojo y en negrita"));

(async () => {
    const chalk = await import('chalk');
 
    console.log(chalk.default.blue('Este texto es de color azul'));
    console.log(chalk.default.red.bold('Este texto es rojo y en negrita'));
})();
 