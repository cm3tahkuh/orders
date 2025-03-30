import { Modal, Paper, Box, Typography, Divider } from "@mui/material";

const OrderEmployeeModal = ({
  open,
  onClose,
  dataAvailableEmployees,
addEmployeeToOrder,
  orderId
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    overflow: "auto",
    p: 4,
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography
            fontSize={24}
            fontWeight={600}
            letterSpacing={-1}
            element="h2"
          >
            Назначить сотрудника на заявку
          </Typography>
          <Box>
            <Divider />
            {dataAvailableEmployees.length > 0 ? (
              dataAvailableEmployees.map((employee) => (
                <Box key={employee.id} onClick={()=> addEmployeeToOrder(orderId, employee.id)}>
                  <Typography>
                    {employee.firstName} {employee.lastName}
                  </Typography>
                  <Typography>{employee.phone}</Typography>
                  <Divider />
                </Box>
              ))
            ) : (
              <Typography>
                Все возможные сотрудники были распределены по этой заявке.
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default OrderEmployeeModal;
