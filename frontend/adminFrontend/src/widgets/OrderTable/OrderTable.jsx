import {
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import SubjectIcon from "@mui/icons-material/Subject";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import BadgeIcon from "@mui/icons-material/Badge";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { orderStatusMap } from "../../entities/order/order";

export const OrderTable = ({ data, onStatusChange, onDelete }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow display={"flex"}>
          <TableCell>
            <Box display={"flex"} gap={1} alignContent={"center"}>
              <AccountCircleIcon />
              Клиент
            </Box>
          </TableCell>
          <TableCell>
            <Box display={"flex"} gap={1} alignContent={"center"}>
              <PhoneIcon />
              Контакты
            </Box>
          </TableCell>
          <TableCell>
            <Box display={"flex"} gap={1} alignContent={"center"}>
              <SubjectIcon />
              Описание
            </Box>
          </TableCell>
          <TableCell>
            <Box display={"flex"} gap={1} alignContent={"center"}>
              <RotateRightIcon />
              Статус
            </Box>
          </TableCell>
          <TableCell>
            <Box display={"flex"} gap={1} alignContent={"center"}>
              <QueryBuilderIcon />
              Создана
            </Box>
          </TableCell>
          <TableCell>
            <Box display={"flex"} gap={1} alignContent={"center"}>
              <BadgeIcon />
              Выполнитель
            </Box>
          </TableCell>
          <TableCell>
            <Box display={"flex"} gap={1} alignContent={"center"}></Box>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.map((order) => (
            <TableRow key={order.id} display={"flex"}>
              <TableCell>
                <Box display={"flex"} gap={1} alignContent={"center"}>
                  {order.name}
                </Box>
              </TableCell>
              <TableCell>
                <Box display={"flex"} gap={1} alignContent={"center"}>
                  {order.phone}
                </Box>
              </TableCell>
              <TableCell>
                <Box display={"flex"} gap={1} alignContent={"center"}>
                  {order.description}
                </Box>
              </TableCell>
              <TableCell>
                <Box display={"flex"} gap={1} alignContent={"center"}>
                  <Select
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value)}
                  >
                    {Object.entries(orderStatusMap).map(([key, value]) => (
                      <MenuItem key={key} value={Number(key)}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </TableCell>
              <TableCell>
                <Box display={"flex"} gap={1} alignContent={"center"}>
                  {new Date(order.createdAt).toLocaleString()}
                </Box>
              </TableCell>
              <TableCell>
                <Box display={"flex"} gap={1} alignContent={"center"}>
                  {order.completedAt === null
                    ? "Не назначен"
                    : new Date(order.completedAt).toLocaleString()}
                </Box>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => onDelete(order.id)}
                  variant="outlined"
                  color="error"
                  startIcon={<HighlightOffIcon />}
                >
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
);
