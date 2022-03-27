FROM mongo

COPY *.json .
COPY import.sh .
RUN chmod +x ./import.sh
CMD ["./import.sh"]
