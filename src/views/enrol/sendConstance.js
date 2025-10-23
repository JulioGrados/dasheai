import { Button } from 'antd'
import PDF from 'utils/functions/pdf'
import moment from 'moment'

export const SendConstanceConclude = ({
  disabled,
  changeSetDisbled,
  name = 'Carlos Eduardo Plasencia Prado',
  constancia = 'Curso de Excel profesional',
  horas = 240,
  inicio = '30 de Enero de 2020',
  fin = '30 de Marzo de 2020',
  colegio = 'Colegio de Ingenieros del Perú CD San Martín',
  dni = 47465282,
  type= 'FBI',
  free = false,
  emit = moment().format('LL'),
  modules=10,
  tables = [
    {
      title: 'Curso de Execel Profesional',
      columns: [
        { header: 'MOD.', dataKey: 'number' },
        { header: 'TEMA', dataKey: 'lesson' },
        { header: 'NOTA', dataKey: 'score' }
      ],
      data: [
        { number: 'Sweden', lesson: 'Canada', score: 'China' },
        { number: 'Norway', lesson: 'Mexico', score: 'Japan' }
      ]
    }
  ],
  onHandleConstance
}) => {
  const genetate = () => {
    const pdf = new PDF()

    const fonts = pdf.fonts()
    console.log(fonts)

    const header = () => {
      const img = document.getElementById('img')
      pdf.image({
        img,
        x: 15,
        y: 5,
        width: 43,
        height: 17
      })
    }

    const footer = () => {
      pdf.setFillColor({ number: '#0077E2' })
      pdf.rect({ x: 0, y: 249, width: 160, height: 1, style: 'F' })
      pdf.text({
        y: 255,
        x: 160,
        text: 'Calle Las Camelias 877, Oficina 302 - San Isidro - Lima',
        align: 'right',
        size: 10
      })
      pdf.text({
        y: 260,
        x: 160,
        text: '+51 997 314 658 - 01 7604253',
        align: 'right',
        size: 10
      })
      pdf.text({
        y: 265,
        x: 160,
        text: 'Lima - Perú',
        align: 'right',
        size: 10
      })
    }

    pdf.text({
      y: 15,
      x: 75,
      text: 'CONSTANCIA',
      align: 'center',
      size: 17,
      fontStyle: 'bold'
    })

    pdf.text({
      y: 25,
      x: 0,
      text:
        'El que suscribe Director Académico de Escuela Americana de Innovación, certifica que:',
      size: 10,
      fontStyle: 'normal'
    })

    pdf.text({
      y: 35,
      x: 75,
      text: name,
      size: 13,
      fontStyle: 'bold',
      align: 'center'
    })

    pdf.text({
      y: 45,
      x: 0,
      text: `Identificado(a) con ${type} ${dni} ha culminado satisfactoriamente el ${constancia}, con un total de ${horas} horas académicas, que se desarrolló del ${inicio} al ${fin}. Habiendo culminado los siguientes módulos.`,
      size: 10,
      fontStyle: 'normal'
    })

    let finalY = 75
    console.log(tables)
    tables.map(table => {
      if (table.title) {
        pdf.text({
          y: finalY - 5,
          x: 75,
          text: table.title,
          fontSize: '10px',
          color: '#000',
          fontStyle: 'normal',
          align: 'center'
        })
      } else {
        finalY -= 15
      }
      finalY = pdf.autoTable({
        y: finalY,
        x: 0,
        columns: table.columns,
        data: table.data,
        modules: modules,
        callback: function () {
          header()
          footer()
        }
      })
    })

    if (finalY - 30 > 180) {
      pdf.addPage()
      header()
      footer()
      finalY = 10
    } else {
      finalY -= 15
    }
    console.log('colegio', colegio)
    pdf.text({
      y: finalY,
      x: 0,
      text: `${
        !free
          ? colegio ? 'El certificado actualmente se encuentra en trámite y será firmado por el ' + colegio + ' y la Escuela Americana de Innovación.\n' : 'El certificado actualmente se encuentra en trámite y será firmado por Escuela Americana de Innovación.\n' 
          : ''
      }Se otorga la presente a solicitud del estudiante, para los fines que estime conveniente.`
    })

    pdf.text({
      y: finalY + 15,
      x: 115,
      text: `Lima, ${emit}`
    })

    const constanceImg = document.getElementById('signature')

    pdf.image({
      img: constanceImg,
      y: 220,
      x: 70,
      width: 65,
      height: 40
    })

    pdf.text({
      y: 238,
      x: 80,
      fontStyle: 'bold',
      text: `Ing. Juan José Pino Reyes`,
      align: 'center'
    })
    pdf.text({
      y: 243,
      x: 80,
      fontStyle: 'bold',
      text: `Director Académico`,
      align: 'center'
    })

    const data = pdf.send()
    onHandleConstance(data)
  }

  return (
    <>
      <Button onClick={() => {
        changeSetDisbled(true)
        genetate()
      }} disabled={disabled}>Enviar mail Constancia Termino</Button>
      <img id='img' src='/static/img/logo.png' style={{ display: 'none' }} />
      <img
        id='signature'
        src='/static/img/constancia.png'
        style={{ display: 'none' }}
      />
    </>
  )
} 
