import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ResetTemplateProps {
  url: string;
  name: string;
  company: string;
}

export default function ResetTemplate({
  url,
  name,
  company,
}: ResetTemplateProps) {
  const currentYear = new Date().getFullYear();
  return (
    <Html>
      <Head>
        <title>{`Restablecimiento de contraseña - ${company}`}</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Restablecimiento de contraseña</Preview>
      <Tailwind>
        <Body className="bg-[url('https://res.cloudinary.com/dwdq9al4v/image/upload/v1725818189/pets/nurouslaqtk7stkn56n7.jpg')] bg-cover bg-center  px-5 pt-10  flex justify-center items-center min-h-[75vh]  ">
          <Container className="pt-5 pb-0 bg-indigo-50 text-slate-800 text-center rounded-lg h-full">
            <Heading className="text-lg font-bold text-center">
              {`¡ Bienvenido ${name || "Usuario"} !`}
            </Heading>
            <Img
              src="https://res.cloudinary.com/dwdq9al4v/image/upload/v1725834088/pets/rlkuvpeksrztdatqg9xh.png"
              alt="Email image"
              width={250}
              height={76}
              className="mt-10 mx-auto"
            />
            <Text className="mt-5 text-center px-5 text-md">
              {`Gracias, ${name || "Usuario"}, por registrarte en: `}
            </Text>

            <Text className="text-blue-500 my-5 px-5 font-bold text-xl">
              {company || "SoS Mascotas"}
            </Text>
            <Text className="p-2 text-md px-5">
              Por favor, confirma tu cuenta haciendo clic en el siguiente botón:
            </Text>
            <Button
              href={url}
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded mx-auto"
            >
              Confirmar cuenta
            </Button>
            <Text className="p-2 text-md px-5">
              Si no solicitaste el registro de esta cuenta, por favor ignora
              este correo electrónico.
            </Text>

            <Section className="bg-gray-800  text-center text-white rounded-b-lg">
              <Text className="text-xs">
                © {currentYear} - Todos los derechos reservados.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
