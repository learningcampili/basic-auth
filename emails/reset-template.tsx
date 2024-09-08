import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Hr,
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
        <Body className="bg-[url('https://res.cloudinary.com/dwdq9al4v/image/upload/v1725818189/pets/nurouslaqtk7stkn56n7.jpg')] bg-cover bg-center  px-5 pt-3  flex justify-center items-center min-h-screen  ">
          <Container className="pt-5 pb-0 bg-slate-100 text-slate-800 text-center rounded-lg">
            <Heading className="text-lg font-bold text-center">
              Restablecimiento de contraseña
            </Heading>
            <Img
              src="https://cdn-icons-png.flaticon.com/512/4144/4144781.png"
              alt="Email image"
              width={150}
              height={150}
              className="mt-10 mx-auto"
            />
            <Text className="mt-5 text-center px-5 text-md">
              Hola, {name || "Usuario"}
              <br />
              <br />
              Recibimos una solicitud para restablecer la contraseña de tu
              cuenta en
              <span className="text-blue-500 ml-1">
                {company || "Petfinder"}
              </span>{" "}
              <br />
              <br />
              Para restablecer tu contraseña, haz clic en el siguiente botón:
            </Text>
            <Button
              href={url}
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded mx-auto"
            >
              Restablecer Contraseña
            </Button>
            <Text className="p-2 text-md">
              Si no solicitaste un cambio de contraseña, por favor ignora este
              correo electrónico.
            </Text>
            <Hr className="my-2 w-[90%]" />
            <Section className="bg-gray-800  text-center text-white">
              <Text className="text-xs">
                {company || "Petfinder"} © {currentYear} All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
