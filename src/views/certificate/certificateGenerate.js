import { Button } from 'antd'
import PDF from 'utils/functions/warrant'

import { MEDIA_PATH } from 'utils/files/path'

export const CertificateGenerate = ({
  name = 'Carlos Eduardo Plasencia Prado',
  names = 'Carlos Eduardo Plasencia Prado',
  course = 'Curso de Excel profesional',
  horas = 240,
  inicio = '30 de Enero de 2020',
  fin = '30 de Marzo de 2020',
  colegio = 'COLEGIO DE ESTADÍSTICOS DEL PERÚ CONSEJO REGIONAL LA LIBERTAD',
  code = 47465282,
  logo = '/static/img/logo.png',
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
  ]
}) => {
  const image = logo ? MEDIA_PATH + logo : '/static/img/logo.png'

  const genetate = () => {
    const pdf = new PDF()

    const fonts = pdf.fonts()
    console.log(fonts)

    pdf.doc.setProperties({
      title: `Certificado - ${course} - ${name}`.toUpperCase(),
      creator: 'Escuela Americana de Innovación'
    })

    const center = (pdf.doc.internal.pageSize.getWidth() - 50) / 2

    console.log('center', pdf.doc.internal.pageSize.getWidth() - 60)

    let index = 0,
      res = []

    while ((index = colegio.indexOf(' ', index + 1)) > 0) {
      res.push(index)
    }

    const exec = res.find(item => item > 37)

    const img = document.getElementById('img')
    const qr = document.getElementById('qr')

    const pino = document.getElementById('pino')
    const jhanina = document.getElementById('jhanina')

    pdf.image({
      img,
      y: 20,
      x: 30,
      width: 62,
      height: 25
    })

    pdf.image({
      img: qr,
      y: 20,
      x: 237,
      width: 30,
      height: 30
    })

    pdf.text({
      y: 15,
      x: center,
      text: 'CERTIFICADO',
      size: 35,
      fontStyle: 'bold',
      align: 'center',
      color: '#0e85dd'
    })

    pdf.text({
      y: 27,
      x: center,
      text: 'Otorgado a:',
      size: 14,
      fontStyle: 'regular',
      align: 'center'
    })
    console.log('name', name)
    pdf.text({
      y: 39,
      x: center,
      text: name,
      size: 21,
      fontStyle: 'semi',
      align: 'center'
    })

    pdf.text({
      y: 51,
      x: center,
      text: `Por concluir y cumplir los requisitos de aprobación del ${course} realizado el ${inicio} hasta el ${fin}, con un total de ${horas} horas académicas.`,
      size: 12,
      fontStyle: 'regular',
      align: 'center'
    })

    pdf.text({
      y: 140,
      x: 5,
      text: `Código de verificación: ${code}`,
      size: 11,
      fontStyle: 'normal',
      align: 'left'
    })

    pdf.image({
      img: jhanina,
      y: 127,
      x: 55,
      width: 50,
      height: 30
    })

    pdf.setFillColor({ number: '#010101' })
    pdf.rect({
      x: 0,
      y: 120,
      width: 100,
      height: 0.5,
      style: 'F'
    })

    pdf.text({
      y: 107,
      x: 55,
      text: 'Ing. Jhanina Inés Chávez Quevedo',
      size: 11,
      fontStyle: 'semi',
      align: 'center'
    })

    pdf.text({
      y: 114,
      x: 55,
      text: 'Directora Ejecutiva',
      size: 11,
      fontStyle: 'semi',
      align: 'center'
    })

    pdf.text({
      y: 121,
      x: 55,
      text: 'ESCUELA AMERICANA DE INNOVACIÓN SAC',
      size: 11,
      fontStyle: 'semi',
      align: 'center'
    })

    pdf.image({
      img: pino,
      y: 133,
      x: 192,
      width: 50,
      height: 30
    })


    pdf.setFillColor({ number: '#010101' })
    pdf.rect({ x: 137, y: 120, width: 100, height: 0.5, style: 'F' })

    pdf.text({
      y: 107,
      x: 192,
      text: 'Ing. Juan José Pino Reyes',
      size: 11,
      fontStyle: 'semi',
      align: 'center'
    })

    pdf.text({
      y: 114,
      x: 192,
      text: 'Director Académico',
      size: 11,
      fontStyle: 'semi',
      align: 'center'
    })

    pdf.text({
      y: 121,
      x: 192,
      text: 'ESCUELA AMERICANA DE INNOVACIÓN SAC',
      size: 11,
      fontStyle: 'semi',
      align: 'center'
    })

    let finalY = 75
    console.log(tables)

    if (finalY - 30 > 180) {
      pdf.addPage()
      finalY = 10
    } else {
      finalY -= 15
    }

    // pdf.print()
    pdf.save(course, names, code)
  }

  return (
    <>
      <Button onClick={genetate}>PDF Certificado</Button>
      <img id='img' src='/static/img/logo.png' style={{ display: 'none' }} />
      <img id='qr' src='/static/img/qr.png' style={{ display: 'none' }} />
      <img id='pino' src='/static/img/pino.png' style={{ display: 'none' }} />
      <img id='jhanina' src='/static/img/jhanina.png' style={{ display: 'none' }} />
    </>
  )
}