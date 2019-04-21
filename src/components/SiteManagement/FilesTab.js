import React from "react";

const FilesTab = () => {
  return (
    <>
      <Button
        style={{ marginBottom: 10, marginLeft: 10 }}
        onClick={() => {
          glob(`${this.state.selectedFolder}/**/*.*`, (err, files) => {
            const formattedFiles = files
              .map(file => file.replace(this.state.selectedFolder, ""))
              .filter(file => file !== "");
            this.setState({ files: formattedFiles });
          });
        }}
      >
        Scan all files
      </Button>
      <Button
        style={{ marginBottom: 10, marginLeft: 10 }}
        onClick={() => {
          const hashedFiles = hashFiles(
            this.state.selectedFolder,
            this.state.files
          );
          deploySite({ files: hashedFiles }, this.state.siteId)
            .then(res => {
              const deployId = res.data.id;
              const requiredForUpload = res.data.required;

              for (const [key, value] of Object.entries(hashedFiles)) {
                if (requiredForUpload.includes(value)) {
                  fs.readFile(
                    `${this.state.selectedFolder}${key}`,
                    "utf8",
                    function(err, data) {
                      if (err) {
                        return console.log(err);
                      }
                      uploadFile(data, key, deployId)
                        .then(res => console.log(value, "uploaded"))
                        .catch(console.log);
                    }
                  );
                }
              }
              // hashedFiles.find(hash => )
            })
            .catch(console.log);
        }}
      >
        <Icon type="upload" /> Upload
      </Button>
      <Button disabled style={{ marginLeft: 10 }}>
        <Icon type="download" />
        Download Files
      </Button>
      <List
        style={{ height: "100%", minHeight: "350px" }}
        bordered
        dataSource={this.state.files}
        renderItem={item => (
          <List.Item
            actions={[
              <a>
                <Icon type="upload" />
              </a>
            ]}
          >
            <List.Item.Meta title={item} />
          </List.Item>
        )}
      />
    </>
  );
};

export default FilesTab;
