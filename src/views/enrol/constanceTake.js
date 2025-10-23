import { Button } from 'antd'
import PDF from 'utils/functions/pdf'
import moment from 'moment'

export const CreateConstanceTake = ({
  name = 'Carlos Eduardo Plasencia Prado',
  constancia = 'Curso de Excel profesional',
  horas = 240,
  dni = 47465282,
  type='FDI',
  emit = moment().format('LL'),
  modules=10,
  tables = [
    {
      title: 'Curso de Execel Profesional',
      columns: [
        { header: 'MOD.', dataKey: 'number' },
        { header: 'TEMA', dataKey: 'lesson' }
      ],
      data: [
        { number: 'Sweden', lesson: 'Canada' },
        { number: 'Norway', lesson: 'Mexico' }
      ]
    }
  ]
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
        text: 'Central telefónica: (01)4800022 - WhatsApp: +5114800022 - Email: cursos@eai.edu.pe',
        align: 'right',
        size: 10
      })
      pdf.text({
        y: 260,
        x: 160,
        text: 'Calle Las Camelias 877, Oficina 302 - San Isidro - Lima',
        align: 'right',
        size: 10
      })
      pdf.text({
        y: 265,
        x: 160,
        text: 'Lima - Perú',
        align: 'right',
        size: 11
      })
    }

    pdf.text({
      y: 10,
      x: 75,
      text: 'CONSTANCIA',
      size: 17,
      fontStyle: 'bold',
      align: 'center'
    })

    pdf.text({
      y: 20,
      x: 0,
      text:
        'El que suscribe Director Académico de Escuela Americana de Innovación, certifica que:',
      size: 10,
      fontStyle: 'normal'
    })

    pdf.text({
      y: 30,
      x: 75,
      text: name,
      size: 13,
      fontStyle: 'bold',
      align: 'center'
    })

    pdf.text({
      y: 40,
      x: 0,
      text: `Identificado(a) con ${type} ${dni} se encuentra cursando el ${constancia}, el curso tendrá una duración total de ${horas} horas académicas. El curso comprende los siguientes módulos:`,
      size: 10,
      fontStyle: 'normal'
    })

    // pdf.text({
    //   y: 55,
    //   x: 0,
    //   text: `El curso comprende los siguientes módulos:`,
    //   align: 'left'
    // })

    let finalY = 70

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

    pdf.text({
      y: finalY - 2,
      x: 0,
      text: `Se otorga la presente a solicitud del estudiante, para los fines que estime conveniente.`
    })

    pdf.text({
      y: finalY + 7,
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

    pdf.print()
  }

  return (
    <>
      <Button onClick={genetate}>PDF Constancia LLevando</Button>
      <img id='img' src='/static/img/logo.png' style={{ display: 'none' }} />
      <img
        id='signature'
        src='/static/img/constancia.png'
        style={{ display: 'none' }}
      />
    </>
  )
}
