import Email from "@mui/icons-material/Email";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CustumButton } from "..";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { blue, pink } from "@mui/material/colors";
import { ActivityProfileProps } from "../../interfaces/activities";

const ActivityProfil = ({
    id,
    userAvatar,
    changedBy,
    user,
    action,
    documentType,
    documentTitle,
    changes,
    createdAt,
}: ActivityProfileProps) => {

    const renderObject = (obj: object) => {
        return (
            <ul>
                {Object.entries(obj).map(([key, value]) => {
                    if (typeof value === 'object' && value !== null) {
                        return (
                            <li key={key}>
                                <strong>{key}:</strong>
                                {renderObject(value)} {/* Recursive call for nested objects */}
                            </li>
                        );
                    } else {
                        return (
                            <li key={key}>
                                <strong>{key}:</strong> {String(value)} {/* Ensure value is a string */}
                            </li>
                        );
                    }
                })}
            </ul>
        );
    };

    const verifyDate = (dateString: string): string => {
        // Vérifier si la chaîne de date est valide
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';

        // Options pour le format de la date et de l'heure
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",    // Affiche l'année
            month: "short",     // Affiche le mois en lettres courtes ("Jan", "Feb", etc.)
            day: "2-digit",     // Affiche le jour avec deux chiffres
            hour: "2-digit",    // Affiche l'heure avec deux chiffres
            minute: "2-digit",  // Affiche les minutes avec deux chiffres
            hour12: true,       // Utilise le format 12 heures avec AM/PM
        };

        // Conversion et formatage de la date en utilisant toLocaleString
        return date.toLocaleString("en-US", options);
    }

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Activity of "{user}"
            </Typography>

            <Box mt="20px" borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
                <Typography mb={3} fontSize={22} fontWeight={700} color="#11142D">
                    {documentType} : {documentTitle}
                </Typography>
                <Box sx={{ display: "flex", gap: 2.5 }}>
                    <Avatar src={userAvatar} />
                    <Box flex={1}>
                        <Typography fontSize={22} fontWeight={600} color="#11142D">
                            {user}
                        </Typography>
                        <Typography mb={1} fontSize={16} color="#808191">
                            {changedBy}
                        </Typography>
                        <Typography mb={1} fontSize={16} color="#808191">
                            Action: {action}
                        </Typography>

                        <Typography fontSize={16} color="#808191">
                            {verifyDate(createdAt)}
                        </Typography>

                        <Box mt={2}>
                            <Box display="flex" flexDirection="column" mt={1}>
                                {renderObject(changes)}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ActivityProfil;
