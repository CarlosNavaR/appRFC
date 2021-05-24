//Listas de nombres y restriccioness
const altisonante = ['BACA', 'BAKA', 'BUEI', 'BUEY', 'CACA', 'CACO', 'CAGA', 'CAGO', 'CAKA', 'CAKO', 'COGE', 'COGI', 'COJA', 'COJE', 'COJI', 'COJO', 'COLA', 'CULO', 'FALO', 'FETO', 'GETA', 'GUEI', 'GUEY', 'JETA', 'JOTO', 'KACA', 'KACO', 'KAGA', 'KAGO', 'KAKA', 'KAKO', 'KOGE', 'KOGI', 'KOJA', 'KOJE', 'KOJI', 'KOJO', 'KOLA', 'KULO', 'LILO', 'LOCA', 'LOCO', 'LOKA', 'LOKO', 'MAME', 'MAMO', 'MEAR', 'MEAS', 'MEON', 'MIAR', 'MION', 'MOCO', 'MOKO', 'MULA', 'MULO', 'NACA', 'NACO', 'PEDA', 'PEDO', 'PENE', 'PIPI', 'PITO', 'POPO', 'PUTA', 'PUTO', 'QULO', 'RATA', 'ROBA', 'ROBE', 'ROBO', 'RUIN', 'SENO', 'TETA', 'VACA', 'VAGA', 'VAGO', 'VAKA', 'VUEI', 'VUEY', 'WUEI', 'WUEY'];
const wordSpecial = ['DA', 'DAS', 'DE', 'DEL', 'DER', 'DI', 'DIE', 'DD', 'EL', 'LA', 'LOS', 'LAS', 'LE', 'LES', 'MAC', 'MC', 'VAN', 'VON', 'Y'];

function getRFC(data) {
    const name = data.nombres.toUpperCase().split(' ');
    const pApellido = data.ApellidoP.toUpperCase().split(' ');
    const mApellido = data.ApellidoM.toUpperCase();
    const fechaNacimiento = data.Fecha.replace(/-/g, '');

    // save final values 
    let nombre;
    let ApellidoP;
    let apellidoM;
    let fecha = fechaNacimiento.substring(2, fechaNacimiento.length);

    if (Array.isArray(name)) {
        if (name[0].includes('MARIA') || name[0].substring(0, 2).includes('MA') || name[0].substring(0, 1).includes('J') || name[0].includes('JOSE')) {
            nombre = name[1];
        } else {
            nombre = name[0];
        }
    }

    if (Array.isArray(pApellido)) {
        if (pApellido.length > 1) {
            if (wordSpecial.includes(pApellido[0])) {
                ApellidoP = pApellido[1];
            } else {
                ApellidoP = pApellido[0];
            }
        } else {
            ApellidoP = pApellido[0];
        }
    } else {
        ApellidoP = pApellido;
    }

    ApellidoP = ApellidoP.match(/^.*?([A-ZÑ])(?:.*?([AEIOU]))/i);

    if (ApellidoP != null) {
        if (ApellidoP[1] === 'Ñ') {
            ApellidoP = 'X' + ApellidoP[2];
        } else {
            ApellidoP = ApellidoP[1] + ApellidoP[2];
        }
    } else {
        ApellidoP = pApellido[0].charAt(0) + 'X';
    }

    if (mApellido == '') {
        apellidoM = 'X';
    } else {
        apellidoM = mApellido.substring(0, 1);
    }


    let verifyName = ApellidoP + apellidoM + nombre.substring(0, 1);

    if (altisonante.includes(verifyName)) {
        verifyName = verifyName.substring(0, 1) + 'X' + verifyName.substring(2, 4);
    }

    let RFC = verifyName + fecha;
    console.log(RFC)
    return RFC;
};

module.exports = {
    'getRFC': getRFC
};