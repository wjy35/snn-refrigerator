package com.ssafy.share.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;

    public String upload(String folderName, String baseName, MultipartFile multipartFile) throws IOException {
        String s3FileName = folderName + "/" + UUID.randomUUID() + "-" + baseName;

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getInputStream().available());
        PutObjectRequest request = new PutObjectRequest(bucket, s3FileName, multipartFile.getInputStream(), objMeta);

        request.setCannedAcl(CannedAccessControlList.PublicRead);
        amazonS3.putObject(request);
        return s3FileName;
    }

    public String getS3ImageUrl(String s3FileName){
        return amazonS3.getUrl(bucket, s3FileName).toString();
    }

    //올라간 사진 삭제
    public boolean delete(String baseName) throws Exception{
        try{
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, baseName));
            return true;
        }
        catch(Exception e){
            return false;
        }
    }

    //이미 올라갔던 사진 삭제 후 재 생성.
    public String modify(String folderName, String baseName, String fileName,  MultipartFile multipartFile) throws Exception{
        if(!delete(fileName)) throw new IllegalArgumentException("삭제에 실패하였습니다.");
        return upload(folderName, baseName, multipartFile);
    }
}
